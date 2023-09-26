import {supabase} from './supabase'

 export async function getDownloadCount(itemId) {
    const { data, error } = await supabase
      .from('downloads')
      .select('count')
      .eq('item_id', itemId);
    if (data && data.length > 0) {
      return data[0].count;
    } else {
      return 0;
    }
  }
  
export async function incrementDownloadCount(itemId) {
  const { data, error } = await supabase
    .from('downloads')
    .select('count')
    .eq('item_id', itemId);
  if (error) {
    console.error(error);
    return;
  }
  if (data && data.length > 0) {
    // Update existing row
    const { data: updateData, error: updateError } = await supabase
      .from('downloads')
      .update({ count: data[0].count + 1 })
      .eq('item_id', itemId);
    if (updateError) {
      console.error(updateError);
    }
  } else {
    // Insert new row
    const { data: insertData, error: insertError } = await supabase
      .from('downloads')
      .insert({ item_id: itemId, count: 1 });
    if (insertError) {
      console.error(insertError);
    }
  }
}

  

  export async function addItem(item) {
    const { data, error } = await supabase
      .from('downloads')
      .insert(item)
    if (error) {
      console.error(error)
    } else {
      console.log('Item added:', item)
    }
  }
   