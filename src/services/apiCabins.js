import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins not found ");
  }
  // console.log(cabins);
  return cabins;
}
export async function deleteCabinapi(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin coudn't be  deleted please try again ");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  // creat and Edit capin

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : supabaseUrl + `/storage/v1/object/public/cabins/` + imageName;

  let query = supabase.from("cabins");
  //1.creat
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); //[]
  //2.edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id); // there is no [] b we update not create
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin coudn't be  ceated ");
  }
  //3 upload image  // or preserve the current one in edit case
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);
  // prevent the new cabin from being created if there is a storage error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin coudn't be ceated,Error in file Uploading ");
  }
  return data;
}
