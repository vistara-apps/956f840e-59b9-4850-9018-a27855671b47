import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 10MB allowed.' },
        { status: 400 }
      );
    }

    // In a real implementation, upload to Pinata/IPFS
    // For demo purposes, create a mock URL
    const mockImageUrl = `https://demo.remixai.com/images/${Date.now()}-${file.name}`;

    // Here you would implement actual upload to Pinata:
    /*
    const pinataSDK = require('@pinata/sdk');
    const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);
    
    const options = {
      pinataMetadata: {
        name: file.name,
        keyvalues: {
          uploadedBy: 'remixai',
          timestamp: Date.now().toString()
        }
      }
    };

    const result = await pinata.pinFileToIPFS(file, options);
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    */

    return NextResponse.json({
      success: true,
      imageUrl: mockImageUrl,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
