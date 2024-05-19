import supabase, { supabaseUrl } from "./supabase";
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

export async function getSession() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function LogoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function signUp({ fullName, password, email }) {
  const { data, error } = await supabase.auth.signUp({
    password,
    email,
    options: {
      data: {
        avatar: "",
        fullName,
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function updateUser({ fullName, password, avatar }) {
  //1.update fullname or password
  let updateUserData;
  if (fullName) updateUserData = { data: { fullName } };
  if (password) updateUserData = { password };
  const { error, data } = await supabase.auth.updateUser(updateUserData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  //2.Upload the avater image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: errorStorage } = await supabase.storage
    .from("Avatar")
    .upload(fileName, avatar);
  if (errorStorage) throw new Error(errorStorage.message);

  //3.update avatar image in user
  const { data: updatedUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/Avatar/${fileName}`,
      },
    });
  if (avatarError) throw new Error(avatarError.message);
  return updatedUser;
}
