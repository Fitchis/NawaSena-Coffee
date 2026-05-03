import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Fetch products with categories
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        price,
        image_url,
        is_available,
        category_id,
        categories:category_id(id, name)
      `)
      .eq('is_available', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Error fetching products:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }

    return NextResponse.json(products || [])
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
