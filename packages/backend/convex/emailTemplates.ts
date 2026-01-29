export const passwordResetTemplate = (token: string) => `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #fafafa;">
        <div style="background-color: #ffffff; border: 1px solid #e5e5e5; padding: 40px;">
            <h1 style="font-style: italic; font-weight: normal; font-size: 28px; margin: 0 0 20px 0; color: #1a1a1a;">
                Password Reset
            </h1>
            <p style="font-size: 14px; line-height: 1.6; color: #666666; margin: 0 0 24px 0;">
                You have requested to reset your password for your Storygraph account. 
                Use the verification code below to set a new password.
            </p>
            <div style="background-color: #f5f5f5; border: 1px solid #e5e5e5; padding: 20px; margin: 24px 0; text-align: center;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 0.3em; color: #1a1a1a;">
                    ${token}
                </span>
            </div>
            <p style="font-size: 12px; color: #999999; margin: 32px 0 0 0;">
                If you didn't request this, you can safely ignore this email.
                <br><br>
                This code will expire in 1 hour.
            </p>
        </div>
        <p style="font-size: 11px; color: #999999; text-align: center; margin-top: 24px;">
            © Storygraph Studio
        </p>
    </body>
</html>
`;

export const emailVerificationTemplate = (token: string) => `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #fafafa;">
        <div style="background-color: #ffffff; border: 1px solid #e5e5e5; padding: 40px; text-align: center;">
            <h1 style="font-style: italic; font-weight: normal; font-size: 28px; margin: 0 0 20px 0; color: #1a1a1a;">
                Verify Your Email
            </h1>
            <p style="font-size: 14px; line-height: 1.6; color: #666666; margin: 0 0 24px 0;">
                Enter this verification code to complete your signup:
            </p>
            <div style="background-color: #f5f5f5; border: 1px solid #e5e5e5; padding: 20px; margin: 24px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 0.3em; color: #1a1a1a;">
                    ${token}
                </span>
            </div>
            <p style="font-size: 12px; color: #999999; margin: 0;">
                This code will expire in 15 minutes.
            </p>
        </div>
        <p style="font-size: 11px; color: #999999; text-align: center; margin-top: 24px;">
            © Storygraph Studio
        </p>
    </body>
</html>
`;
