import { createClient } from "@/lib/supabase/server";
import AdminProductEditClient from "@/components/admin/AdminProductEditClient";

type Props = { params: { id: string } };

export default async function EditProductPage({ params }: Props) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  return <AdminProductEditClient initial={(data as any) ?? null} />;
}
