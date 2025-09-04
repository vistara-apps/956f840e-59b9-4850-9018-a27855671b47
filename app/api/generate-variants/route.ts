import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, platforms, productDescription } = await request.json();

    if (!imageUrl || !platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate text variants for each platform
    const textVariants = [];
    
    for (const platform of platforms) {
      const completion = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "system",
            content: `You are an expert ad copywriter specializing in ${platform} ads. Create compelling, platform-specific ad copy that drives conversions.`
          },
          {
            role: "user",
            content: `Create 2-3 different ad text variations for ${platform} for this product: ${productDescription || 'a product shown in the image'}. 
            
            Each variation should:
            - Be optimized for ${platform}'s audience and format
            - Include a strong call-to-action
            - Be engaging and conversion-focused
            - Match ${platform}'s tone and style
            
            Return only the text variations, one per line.`
          }
        ],
        max_tokens: 500,
        temperature: 0.8,
      });

      const platformVariants = completion.choices[0].message.content
        ?.split('\n')
        .filter(line => line.trim())
        .slice(0, 3) || [];

      textVariants.push(...platformVariants.map(text => ({
        platform,
        text: text.replace(/^\d+\.\s*/, '').trim()
      })));
    }

    // Create ad variants with the original image and generated text
    const variants = textVariants.map((variant, index) => ({
      id: `variant_${index + 1}`,
      imageUrl: imageUrl,
      textOverlay: variant.text,
      platformSpec: variant.platform,
      selected: false
    }));

    return NextResponse.json({
      success: true,
      variants: variants
    });

  } catch (error) {
    console.error('Error generating variants:', error);
    return NextResponse.json(
      { error: 'Failed to generate variants' },
      { status: 500 }
    );
  }
}
