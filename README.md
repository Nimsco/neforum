# 🇳🇵 NEForum

**NEForum** is a completely anonymous discussion forum built primarily for Nepali users. It provides a space where people can share thoughts, opinions, questions, experiences, stories, and discussions without publicly revealing their real identity.

The goal of NEForum is simple:

> **Talk freely. Stay anonymous. Connect through ideas, not identities.**

Unlike traditional social media platforms that focus heavily on profiles, followers, likes, and personal identities, NEForum focuses on **content and conversation**.

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Why NEForum?](#-why-neforum)
* [Core Features](#-core-features)
* [How Anonymity Works](#-how-anonymity-works)
* [User Roles](#-user-roles)
* [Main User Flow](#-main-user-flow)
* [Technology Stack](#-technology-stack)
* [Project Structure](#-project-structure)
* [Authentication](#-authentication)
* [Database](#-database)
* [API Overview](#-api-overview)
* [Security](#-security)
* [Installation](#-installation)
* [Environment Variables](#-environment-variables)
* [Running the Project](#-running-the-project)
* [Future Features](#-future-features)
* [Project Goals](#-project-goals)
* [Contributing](#-contributing)
* [Disclaimer](#-disclaimer)

---

# 📖 About the Project

NEForum is a full-stack anonymous forum designed with **Nepali internet users** in mind.

Users can create an account using a username and password and participate in discussions without having to publicly provide their real name, profile information, or other personal details.

The platform is designed around the idea that users should be able to discuss topics based on **what they say**, rather than **who they are**.

Possible discussions can include:

* 🇳🇵 Nepal-related topics
* 🎓 Education and university life
* 💼 Jobs and careers
* 💻 Technology
* 🎮 Gaming
* 🎬 Movies and entertainment
* ❤️ Relationships
* 🧠 Life experiences
* 😂 Memes and casual discussions
* ❓ Questions and advice
* 🗣️ Opinions and general discussions

The platform can eventually support both English and Nepali content, allowing users to communicate in the language they are most comfortable with.

---

# 💡 Why NEForum?

Many existing social platforms encourage users to build public identities around their accounts.

That can make some people uncomfortable when discussing:

* Personal experiences
* Relationship problems
* Academic struggles
* Workplace issues
* Financial difficulties
* Social issues
* Sensitive questions
* Opinions they don't want associated with their real identity

NEForum takes a different approach.

Instead of asking:

> **"Who are you?"**

the platform focuses on:

> **"What do you want to say?"**

The project is therefore designed around **anonymous participation rather than personal branding**.

---

# ✨ Core Features

## 👤 Anonymous User Accounts

Users can create an account with:

* Username
* Password

No real name is required.

The username is used to identify a user's account within the system while keeping their real-world identity private from other users.

---

## 🔐 Authentication

NEForum uses token-based authentication.

The system supports:

* User registration
* User login
* Access tokens
* Refresh tokens
* Secure HTTP-only cookies
* Password hashing
* Protected routes
* Logout
* Token expiration
* Account blocking

The authentication system is designed so that passwords are never stored as plain text.

---

## 📝 Create Posts

Authenticated users can create anonymous posts.

A post may contain:

* Title
* Content
* Category
* Creation date
* Author reference internally

The author's internal database identity is not intended to be exposed publicly as a real identity.

---

## 💬 Discussions

Users can participate in discussions through comments and replies.

This allows a post to develop into a conversation rather than simply being a one-way publication.

---

## 👍 Reactions

Users can interact with posts through reactions.

The reaction system can be extended to support different reaction types in the future.

---

## 👁️ Post Watch History

NEForum can maintain a user's post viewing history.

This can eventually be used for:

* Recently viewed posts
* Continue reading
* Personalized recommendations
* Better browsing experience

---

## 🚫 User Blocking

The system supports blocking user accounts.

A blocked account cannot log in and receives an appropriate authorization error.

This provides administrators with a mechanism for dealing with accounts that violate platform rules.

---

## 🛡️ Moderation

Although the platform focuses on anonymity, anonymity does not mean there are no rules.

Administrative moderation can be used to handle:

* Spam
* Harassment
* Illegal content
* Malicious activity
* Abusive behavior
* Repeated rule violations

---

# 🕵️ How Anonymity Works

NEForum separates **account authentication** from **public identity**.

A user still needs an account so that the system can:

* Authenticate them
* Prevent unauthorized posting
* Manage their posts
* Track actions internally
* Apply moderation rules

However, the public interface does not need to expose personal information.

### Example

A user creates:

```text
Username: mountain_owl
```

They can participate in discussions as:

```text
mountain_owl
```

rather than exposing:

```text
Real Name
Phone Number
Email Address
Home Address
```

The purpose is to minimize unnecessary personal information while maintaining enough account structure to operate the platform.

> **Anonymous to other users does not necessarily mean technically untraceable to the server.**

The platform should be transparent about what information is actually collected and stored.

---

# 👥 User Roles

NEForum can use three main levels of access.

## 👤 User

Normal users can:

* Register
* Login
* Logout
* Create posts
* Read posts
* Comment
* React
* Manage their own content
* View their history

---

## 🛡️ Moderator / Admin

Administrators can have additional permissions such as:

* View users
* Block users
* Unblock users
* Remove inappropriate posts
* Remove comments
* Manage reported content
* Manage categories
* Monitor platform activity

Administrative functionality should be separated from normal user functionality.

---

# 🔄 Main User Flow

```text
                    ┌───────────────┐
                    │     Visitor   │
                    └───────┬───────┘
                            │
                 ┌──────────┴──────────┐
                 ↓                     ↓
             Register                Login
                 │                     │
                 └──────────┬──────────┘
                            ↓
                       Authenticated
                            │
             ┌──────────────┼──────────────┐
             ↓              ↓              ↓
          Browse          Create         Comment
           Posts           Post           /React
             │              │              │
             └──────────────┼──────────────┘
                            ↓
                         Logout
```

---

# 🛠️ Technology Stack

## Frontend

* **React**
* **React Router DOM**
* **Tailwind CSS**
* JavaScript
* Fetch API / Axios depending on implementation

## Backend

* **Node.js**
* **Express.js**
* JavaScript / ES Modules

## Database

* **MongoDB**
* **Mongoose**

## Authentication & Security

* **JSON Web Tokens (JWT)**
* **bcrypt**
* HTTP-only cookies

## Development Tools

* Git
* GitHub
* Postman
* Nodemon
* VS Code / Cursor

---

# 📂 Project Structure

A simplified backend structure:

```text
backend/
│
├── src/
│   ├── controllers/
│   │   └── user.controller.js
│   │
│   ├── models/
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   └── user.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   ├── generateTokens.js
│   │   └── validators.js
│   │
│   └── app.js
│
├── server.js
├── .env
├── .gitignore
└── package.json
```

The frontend follows a separate React-based structure.

---

# 🔑 Authentication

NEForum uses two JWT tokens.

## Access Token

The access token is short-lived.

It is used when making protected API requests:

```text
Authorization: Bearer <accessToken>
```

The access token identifies the authenticated user.

---

## Refresh Token

The refresh token has a longer lifetime.

It is stored in:

1. An **HTTP-only cookie**
2. The user's database record

The refresh token is not returned to frontend JavaScript.

Example:

```text
Access Token
    ↓
Frontend memory

Refresh Token
    ↓
HTTP-only Cookie
    +
MongoDB
```

---

## Token Refresh Flow

```text
Access Token expires
        ↓
Frontend requests /refresh
        ↓
Browser sends refresh cookie
        ↓
Server verifies refresh token
        ↓
Server finds user
        ↓
Server checks stored refresh token
        ↓
Generate new access token
        ↓
Return new access token
```

When the refresh token itself expires or is revoked, the user must authenticate again.

---

# 🗄️ Database

MongoDB is used as the primary database.

A simplified user document may look like:

```js
{
    _id: ObjectId,
    username: "mountain_owl",
    password: "hashed-password",
    refreshToken: "jwt-token",
    isBlocked: false,
    createdAt: Date,
    updatedAt: Date
}
```

Passwords are hashed before being stored.

The plain-text password is never intentionally stored in the database.

---

# 🔌 API Overview

The API can be organized around authentication and forum resources.

### Authentication

```text
POST /api/users/register
POST /api/users/login
POST /api/users/refresh
POST /api/users/logout
```

### Users

```text
GET  /api/users/me
PATCH /api/users/me
```

### Posts

```text
GET    /api/posts
GET    /api/posts/:id
POST   /api/posts
PATCH  /api/posts/:id
DELETE /api/posts/:id
```

### Comments

```text
GET    /api/posts/:id/comments
POST   /api/posts/:id/comments
DELETE /api/comments/:id
```

The exact endpoints may change as the project develops.

---

# 🔒 Security

Security is particularly important for an anonymous platform.

NEForum aims to follow several security practices.

### Password Hashing

Passwords are hashed using bcrypt before being stored.

```text
Plain Password
      ↓
    bcrypt
      ↓
Password Hash
      ↓
   MongoDB
```

---

### HTTP-only Refresh Cookie

The refresh token is stored using an HTTP-only cookie.

This prevents normal frontend JavaScript from directly reading the refresh token.

---

### Secure Cookie

In production:

```js
secure: true
```

allows the cookie to be transmitted only over HTTPS.

---

### SameSite Cookie

The refresh cookie uses:

```js
sameSite: "strict"
```

to restrict cross-site cookie transmission.

The exact cookie configuration may need adjustment depending on how the frontend and backend are deployed.

---

### Environment Variables

Secrets such as:

```text
JWT secrets
MongoDB connection strings
API keys
```

should be stored in `.env` and never committed to GitHub.

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd neforum
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Configure Environment Variables

Create:

```text
.env
```

inside the backend directory.

Example:

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

NODE_ENV=development
```

Do not commit `.env` to GitHub.

---

# ▶️ Running the Project

Start the backend development server:

```bash
npm run dev
```

The server should run on:

```text
http://localhost:3000
```

Start the frontend using the appropriate frontend development command, for example:

```bash
npm run dev
```

The frontend and backend can then communicate through the configured API.

---

# 🧪 Testing

API endpoints can be tested using **Postman**.

Recommended authentication testing sequence:

```text
1. Register
       ↓
2. Receive access token
       ↓
3. Login
       ↓
4. Access protected endpoint
       ↓
5. Refresh access token
       ↓
6. Logout
       ↓
7. Verify protected access is denied
```

Important edge cases should also be tested:

* Missing username
* Missing password
* Invalid password
* Duplicate username
* Non-existent user
* Blocked user
* Expired access token
* Expired refresh token
* Invalid refresh token
* Missing refresh cookie

---

# 🚀 Future Features

NEForum is designed to be extendable.

Potential future features include:

### 🌐 Nepali Language Support

A bilingual interface supporting:

* English
* नेपाली

This could make the platform more accessible to Nepali users.

---

### 🏷️ Categories

Possible categories:

```text
General
Nepal
Education
Career
Technology
Entertainment
Gaming
Relationships
Advice
Memes
Confessions
```

---

### 🔎 Search

Users could search posts by:

* Keywords
* Categories
* Tags
* Recent posts
* Popular posts

---

### 🔥 Trending Discussions

A trending system could highlight discussions receiving high levels of activity.

---

### 🚩 Reporting System

Users could report:

* Posts
* Comments
* Accounts

Reports could then be reviewed by moderators.

---

### 💬 Anonymous Reply Chains

Users could participate in long-form conversations while maintaining the forum's anonymous identity model.

---

### 🔔 Notifications

Possible notifications:

* Someone replied to your post
* Someone replied to your comment
* Your post was reported
* Your account status changed

Notifications should avoid revealing unnecessary personal information.

---

### 🧠 Smart Content Discovery

A future recommendation system could suggest discussions based on topics a user frequently interacts with.

For example:

```text
User frequently reads:
Technology + Programming

                ↓

Recommend:
Technology discussions
Programming discussions
Developer experiences
```

This could eventually become an interesting application of data analysis or machine learning.

---

# 🧭 Project Philosophy

NEForum is built around a simple principle:

> **Anonymity should encourage conversation, not remove responsibility.**

Users should be able to discuss things they might hesitate to discuss publicly, while still following reasonable community standards.

The platform therefore aims to balance:

```text
Privacy
   +
Freedom of expression
   +
Community responsibility
   +
Moderation
```

The goal isn't to create a place where "anything goes."

The goal is to create a place where people can **speak more freely while still respecting other people**.

---

# 🎯 Project Goals

The main goals of NEForum are:

1. Build a functional anonymous discussion platform.
2. Provide a simple and accessible user experience.
3. Minimize unnecessary personal information collection.
4. Implement secure authentication.
5. Provide a scalable backend architecture.
6. Support meaningful community discussions.
7. Provide moderation mechanisms.
8. Create a platform that can eventually be adapted specifically for Nepali online communities.
9. Demonstrate practical full-stack development using the MERN stack.

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you want to contribute:

```bash
git clone <repository-url>
```

Create a new branch:

```bash
git checkout -b feature/your-feature
```

Make your changes, test them, and create a pull request.

Before submitting a contribution, make sure that:

* Existing functionality is not unnecessarily broken.
* Sensitive information is not committed.
* Authentication and authorization are handled correctly.
* New API endpoints are tested.
* Code follows the project's existing structure.

---

# ⚠️ Disclaimer

NEForum is a software project intended for educational and community discussion purposes.

"Anonymous" refers primarily to the public-facing identity model. It should not be interpreted as a guarantee that a user's activity is technically untraceable.

The platform should clearly communicate its privacy practices and comply with applicable laws and regulations.

---

# 👨‍💻 Built With

**MERN Stack**

```text
MongoDB
Express.js
React
Node.js
```

with JWT-based authentication and a security-focused anonymous forum architecture.

---

## 🇳🇵 NEForum

**A place to share what you think — without making your identity the topic.**
