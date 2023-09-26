import {supabase} from './supabase'

// export async function incrementViewCount(id, slug) {
//     const { data, error } = await supabase
//       .from('view')
//       .select('view_count')
//       .eq('id', id);
//     if (error) {
//       console.error(error);
//       return;
//     }
//     if (data && data.length > 0) {
//       // Update existing row
//       const { data: updateData, error: updateError } = await supabase
//         .from('view')
//         .update({ view_count: data[0].view_count + 1 })
//         .eq('id', id);
//       if (updateError) {
//         console.error(updateError);
//       }
//     } else {
//       // Insert new row
//       const { data: insertData, error: insertError } = await supabase
//         .from('view')
//         .insert({ id: id, slug: slug, view_count: 1 });
//       if (insertError) {
//         console.error(insertError);
//       }
//     }
//   }

export async function incrementViewCount(id, slug) {
  let data, error;
  if (id) {
      // If id is provided, select view count based on id
      console.log('Selecting view count by id');
      ({ data, error } = await supabase
          .from('view')
          .select('view_count')
          .eq('id', id));
          console.log('Selected view count by id');
  } else if (slug) {
    console.log('Selecting view count by slug');
      // If slug is provided, select view count based on slug
      ({ data, error } = await supabase
          .from('view')
          .select('view_count')
          .eq('slug', slug));
          console.log('Selected view count by slug');
  }
  if (error) {
      console.error(error);
      return;
  }
  if (data && data.length > 0) {
      // Update existing row
      console.log('Updating view count');
      const { data: updateData, error: updateError } = await supabase
          .from('view')
          .update({ view_count: data[0].view_count + 1 })
          .eq(id ? 'id' : 'slug', id || slug);
          console.log('Updated view count');
      if (updateError) {
          console.error(updateError);
      }
  } else {
      // Insert new row
      const { data: insertData, error: insertError } = await supabase
          .from('view')
          .insert({ id: id, slug: slug, view_count: 1 });
          console.log('Inserted new row with view count');
      if (insertError) {
          console.error(insertError);
      }
  }
}

  export async function getViewCount(slug) {
    const { data, error } = await supabase
      .from('view')
      .select('view_count')
      .eq('slug', slug);
    if (error) {
      console.log(error);
    }
    if (data && data.length > 0) {
      console.log(data)
      return data[0].view_count ;
    } else {
      return 0;
    }
  }

  // export async function getViewCount(id) {
  //   const { data, error } = await supabase
  //     .from('views')
  //     .select('view_count')
  //     .eq('id', id);
  //   if (error) {
  //     console.log(error);
  //   }
  //   if (data && data.length > 0) {
  //     console.log(data)
  //     return data[0].view_count ;
  //   } else {
  //     return 0;
  //   }
  // }
  


  
//   test function
//   async function testGetViewCount() {
//     const id = '01ARCFE54TJ3VCZI266VELOZJHHAI4RWFV';
//     const viewCount = await getViewCount(id);
//     console.log(`View count for id ${id}: ${viewCount}`);
//   }
  
//   testGetViewCount();
  