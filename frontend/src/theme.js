/**
 * Design Tokens — NEForum
 *
 * Single source of truth for colours, radius, shadow, and typography.
 */

// ─── Light palette ────────────────────────────────────────────────

export const light = {
    // Base
    background: '#F8FAFC',
    card: '#FFFFFF',

    // Brand
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    primaryLight: '#DBEAFE',

    // Brand dark / headings
    dark: '#0F172A',
    text: '#1E293B',
    muted: '#64748B',

    // UI
    border: '#E2E8F0',
    borderHover: '#CBD5E1',

    // States
    error: '#EF4444',
    errorLight: '#FEF2F2',

    success: '#22C55E',
    successLight: '#F0FDF4',

    warning: '#F59E0B',
    warningLight: '#FFFBEB',

    // Anonymous / community accent
    accent: '#7C3AED',
    accentLight: '#EDE9FE',
};


// ─── Dark palette ────────────────────────────────────────────────

export const dark = {
    // Base
    background: '#0F172A',
    card: '#1E293B',

    // Brand
    primary: '#3B82F6',
    primaryHover: '#60A5FA',
    primaryLight: '#1E3A8A',

    // Text
    text: '#F8FAFC',
    muted: '#94A3B8',

    // UI
    border: '#334155',
    borderHover: '#475569',

    // States
    error: '#F87171',
    errorLight: '#450A0A',

    success: '#4ADE80',
    successLight: '#052E16',

    warning: '#FBBF24',
    warningLight: '#451A03',

    // Anonymous / community accent
    accent: '#A78BFA',
    accentLight: '#2E1065',
};


// ─── Shared constants ────────────────────────────────────────────

export const radius = {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',
};


export const shadow = {
    sm: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',

    md:
        '0 4px 6px -1px rgba(15, 23, 42, 0.08), ' +
        '0 2px 4px -2px rgba(15, 23, 42, 0.08)',

    lg:
        '0 10px 15px -3px rgba(15, 23, 42, 0.10), ' +
        '0 4px 6px -4px rgba(15, 23, 42, 0.10)',
};


export const typography = {
    fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};