const apiPrefix = '/api/v1';

const getUpstreamUrl = (requestUrl, configuredApiUrl) => {
    const incomingUrl = new URL(
        requestUrl,
        'https://vercel.local'
    );
    const apiBaseUrl = new URL(
        configuredApiUrl.replace(/\/+$/, '')
    );
    const requestPath = incomingUrl.pathname.replace(
        new RegExp(`^${apiPrefix}(?=/|$)`),
        ''
    );

    return new URL(
        `${apiBaseUrl.pathname.replace(/\/+$/, '')}${requestPath}${incomingUrl.search}`,
        apiBaseUrl.origin
    );
};

const serializeBody = (body) => {
    if (body == null) return undefined;
    if (Buffer.isBuffer(body) || typeof body === 'string') {
        return body;
    }
    return JSON.stringify(body);
};

export default async function handler(req, res) {
    const configuredApiUrl = process.env.VITE_API_URL;

    if (!configuredApiUrl) {
        return res.status(500).json({
            success: false,
            message:
                'VITE_API_URL is not configured for the API proxy.',
        });
    }

    try {
        const targetUrl = getUpstreamUrl(
            req.url || apiPrefix,
            configuredApiUrl
        );
        const headers = {};

        for (const name of [
            'accept',
            'authorization',
            'content-type',
            'cookie',
        ]) {
            const value = req.headers[name];
            if (value) headers[name] = value;
        }

        const method = req.method || 'GET';
        const body =
            method === 'GET' || method === 'HEAD'
                ? undefined
                : serializeBody(req.body);
        const upstream = await fetch(targetUrl, {
            method,
            headers,
            body,
            redirect: 'manual',
        });

        res.status(upstream.status);
        res.setHeader('Cache-Control', 'no-store');

        for (const name of [
            'content-type',
            'location',
            'retry-after',
            'www-authenticate',
        ]) {
            const value = upstream.headers.get(name);
            if (value) res.setHeader(name, value);
        }

        const setCookies =
            upstream.headers.getSetCookie?.();
        if (setCookies?.length) {
            res.setHeader('Set-Cookie', setCookies);
        } else {
            const setCookie =
                upstream.headers.get('set-cookie');
            if (setCookie)
                res.setHeader('Set-Cookie', setCookie);
        }

        const responseBody = Buffer.from(
            await upstream.arrayBuffer()
        );
        return res.send(responseBody);
    } catch {
        return res.status(502).json({
            success: false,
            message: 'The API server could not be reached.',
        });
    }
}
