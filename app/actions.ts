'use server';

import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function logout() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function createStore(formData: {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  heroTitle?: string;
  heroDescription?: string;
}) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const { data, error } = await supabase
    .from('stores')
    .insert({
      owner_id: user.id,
      name: formData.name,
      slug: formData.slug,
      description: formData.description || null,
      logo_url: formData.logo || null,
      hero_title: formData.heroTitle || null,
      hero_description: formData.heroDescription || null,
      active: true,
    })
    .select()
    .single();

  if (error) {
    console.error('Create store error:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/store');
  return { data };
}

export async function updateStore(
  storeId: string,
  formData: {
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    heroTitle?: string;
    heroDescription?: string;
  }
) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const { data, error } = await supabase
    .from('stores')
    .update({
      name: formData.name,
      slug: formData.slug,
      description: formData.description || null,
      logo_url: formData.logo || null,
      hero_title: formData.heroTitle || null,
      hero_description: formData.heroDescription || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', storeId)
    .eq('owner_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Update store error:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/store');
  return { data };
}

export async function createProduct(formData: {
  storeId: string;
  name: string;
  description?: string;
  price: string;
  image?: string;
  stock: number;
  active?: boolean;
}) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const { data, error } = await supabase
    .from('products')
    .insert({
      store_id: formData.storeId,
      name: formData.name,
      description: formData.description || null,
      price: Number(formData.price),
      image_url: formData.image || null,
      stock: formData.stock,
      active: formData.active ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error('Create product error:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/products');
  return { data };
}

export async function updateProduct(
  productId: string,
  formData: {
    name: string;
    description?: string;
    price: string;
    image?: string;
    stock: number;
    active?: boolean;
  }
) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const { data, error } = await supabase
    .from('products')
    .update({
      name: formData.name,
      description: formData.description || null,
      price: Number(formData.price),
      image_url: formData.image || null,
      stock: formData.stock,
      active: formData.active ?? true,
    })
    .eq('id', productId)
    .select()
    .single();

  if (error) {
    console.error('Update product error:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/products');
  return { data };
}

export async function deleteProduct(productId: string) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    console.error('Delete product error:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/products');
  return { success: true };
}

export async function placeOrder(formData: {
  storeSlug: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: Array<{
    productId: string;
    quantity: number;
    price: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
}) {
  const supabase = await createServerClient();

  const { data: store, error: storeError } = await supabase
    .from('stores')
    .select('id')
    .eq('slug', formData.storeSlug)
    .eq('active', true)
    .single();

  if (storeError || !store) {
    return { error: 'Store not found' };
  }

  let customerId: string;

  const { data: existingCustomer } = await supabase
    .from('customers')
    .select('id')
    .eq('store_id', store.id)
    .eq('email', formData.customer.email)
    .maybeSingle();

  if (existingCustomer) {
    customerId = existingCustomer.id;
  } else {
    const { data: newCustomer, error: customerError } = await supabase
      .from('customers')
      .insert({
        store_id: store.id,
        name: formData.customer.name,
        email: formData.customer.email,
        phone: formData.customer.phone,
        address: formData.customer.address,
        city: formData.customer.city,
        postal_code: formData.customer.postalCode,
      })
      .select('id')
      .single();

    if (customerError || !newCustomer) {
      console.error('Create customer error:', customerError);
      return { error: customerError?.message || 'Failed to create customer' };
    }
    customerId = newCustomer.id;
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      store_id: store.id,
      customer_id: customerId,
      status: 'pending',
      payment_status: 'pending',
      subtotal: formData.subtotal,
      shipping: formData.shipping,
      total: formData.total,
    })
    .select()
    .single();

  if (orderError || !order) {
    console.error('Create order error:', orderError);
    return { error: orderError?.message || 'Failed to create order' };
  }

  const orderItems = formData.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
    unit_price: Number(item.price),
    total: Number(item.price) * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Create order items error:', itemsError);
    return { error: itemsError.message || 'Failed to create order items' };
  }

  return { orderId: order.id };
}
