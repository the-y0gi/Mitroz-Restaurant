export const generateOTPTemplate = (otp, name = "Guest") => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #F97316, #EA580C); padding: 30px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 28px; letter-spacing: 1px; }
        .content { padding: 30px; text-align: center; color: #333; }
        .otp-box { background: #FFF7ED; color: #F97316; font-size: 36px; font-weight: bold; letter-spacing: 8px; padding: 15px 30px; border-radius: 8px; border: 2px dashed #F97316; display: inline-block; margin: 20px 0; }
        .footer { background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; }
        .btn { background-color: #F97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        
        <div class="header">
          <h1>Mitroz Dining</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Premium Lounge & Bar</p>
        </div>

        <div class="content">
          <h2 style="color: #1F2937;">Verify Your Email</h2>
          <p style="color: #4B5563; font-size: 16px;">Hello <b>${name}</b>,</p>
          <p style="color: #6B7280;">Use the following One Time Password (OTP) to complete your reservation at Mitroz.</p>
          
          <div class="otp-box">${otp}</div>

          <p style="font-size: 14px; color: #EF4444;">⏰ This code is valid for 10 minutes.</p>
          <p style="font-size: 13px; color: #9CA3AF;">If you didn't request this, please ignore this email.</p>
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Mitroz Restaurant. All rights reserved.</p>
          <p>Vijay Nagar, Indore, Madhya Pradesh</p>
        </div>

      </div>
    </body>
    </html>
  `;
};