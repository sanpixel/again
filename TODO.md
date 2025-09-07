# TODO

## OAuth Redirect Solutions

1. **Custom OAuth flow** - Instead of using Supabase's `signInWithOAuth`, manually construct the Google OAuth URL with your redirect parameters
2. **Window/popup approach** - Open OAuth in a popup window and handle the callback differently
3. **Server-side OAuth** - Handle the OAuth flow through your backend instead of client-side
4. **Different Supabase method** - Try a different Supabase auth method that might respect the redirect parameter better

The issue seems to be that Supabase's `signInWithOAuth` isn't honoring the `redirectTo` parameter when the Site URL is set. We might need to bypass Supabase's OAuth wrapper and go direct to Google's OAuth endpoints.
