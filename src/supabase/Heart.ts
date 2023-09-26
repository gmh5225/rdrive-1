import { supabase } from './supabase';

const TABLE_NAME = 'heart';

export async function getHeartCount(itemId) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('count')
      .eq('item_id', itemId);

    if (error) {
      throw new Error('Failed to fetch heart count');
    }

    return data && data.length > 0 ? data[0].count : 0;
  } catch (error) {
    console.error('getHeartCount Error:', error.message);
    return 0;
  }
}

export async function incrementHeartCount(itemId) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('count')
      .eq('item_id', itemId);

    if (error) {
      throw new Error('Failed to fetch heart count');
    }

    if (data && data.length > 0) {
      const newCount = data[0].count + 1;
      await supabase.from(TABLE_NAME).update({ count: newCount }).eq('item_id', itemId);
    } else {
      await supabase.from(TABLE_NAME).insert({ item_id: itemId, count: 1 });
    }
  } catch (error) {
    console.error('incrementHeartCount Error:', error.message);
  }
}

export async function createOrUpdateItem(item) {
  try {
    // Begin a transaction
    const { data, error } = await supabase.rpc('upsert_item', {
      item_id: item.item_id,
      count: item.count,
    });

    if (error) {
      throw new Error('Failed to create or update item');
    } else {
      console.log('Item added/updated:', item);
    }
  } catch (error) {
    console.error('createOrUpdateItem Error:', error.message);
  }
}

