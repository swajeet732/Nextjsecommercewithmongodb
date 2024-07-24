import { PDFDocument, rgb } from 'pdf-lib';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Order from '../../src/app/models/Order';
import Product from '../../src/app/models/Product';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { products, totalPrice, email } = req.body;
  
        // Validate and map product ids to ObjectId
        const { ObjectId } = mongoose.Types;
        const productIds = products.map(product => ObjectId.isValid(product._id) ? new ObjectId(product._id) : null).filter(Boolean);
  
        // Save order in MongoDB
        const order = new Order({
          products: productIds,
          totalPrice,
          email, // Ensure 'email' matches your schema field name
        });
        await order.save();
  
        // Generate PDF bill
        const pdfDoc = await generatePDF(products, totalPrice);
  
        // Send PDF as email attachment
        await sendEmailWithBill(products, totalPrice, email, pdfDoc);
  
        // Send PDF as response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="bill.pdf"');
        res.status(200).send(pdfDoc);
      } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ error: 'Error processing order' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }

async function generatePDF(products, totalPrice) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();
  const margin = 50;

  const fontSize = 15;
  const lineGap = 20;

  page.drawText('Bill of Purchase', {
    x: margin,
    y: height - margin,
    size: 24,
    color: rgb(0, 0, 0),
  });

  let y = height - margin - 50;

  products.forEach((product, index) => {
    y -= lineGap;
    page.drawText(`${index + 1}. ${product.name}: $${product.price.toFixed(2)}`, {
      x: margin,
      y,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
  });

  y -= lineGap;
  page.drawText(`Total Price: $${totalPrice.toFixed(2)}`, {
    x: margin,
    y,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}

async function sendEmailWithBill(products, totalPrice, email, pdfDoc) {
  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'swajeet.chavan@vervali.com',  // Your email address
      pass: 'Devops@2002'    // Your email password or application-specific password
    }
  });

  // Construct email message
  const mailOptions = {
    from: 'swajeet.chavan@vervali.com',    // Sender address
    to: email,                       // Recipient address
    subject: 'Order Confirmation and Bill',  // Subject line
    html: `
      <p>Thank you for your order. Your total price is $${totalPrice.toFixed(2)}.</p>
      <p>Your order will be delivered within two days.</p>
      <p>This is your order summary:</p>
      <ul>
        ${products.map(product => `<li>${product.name}: $${product.price.toFixed(2)}</li>`).join('')}
      </ul>
    `,
    attachments: [
      {
        filename: 'bill.pdf',
        content: pdfDoc,
        encoding: 'base64'
      }
    ]
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
