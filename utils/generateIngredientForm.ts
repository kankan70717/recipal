import { EnumUnit } from "@/db/schema";

type IngredientFormInsert = {
  name: string;
  name_ja: string;
  status: "active" | "inactive" | "pending";
  store_id: string;
  ingredient_category_id: string;
  ingredient_tag_id: string[] | null;
  image_file: File | null;
  vendor_id: string;
  purchase_amount: number;
  purchase_unit: EnumUnit;
  purchase_price: number;
  usage_unit: EnumUnit;
  yield_rate: number;
  created_by: string;
  created_at: Date;
  updated_at: Date;
};

export const generateEmptyIngredientForm = (): IngredientFormInsert => {
  return {
    name: "",
    name_ja: "",
    status: "pending",
    store_id: "",
    ingredient_category_id: "",
	ingredient_tag_id: [],
	image_file: null,
    vendor_id: "",
    purchase_amount: 0,
    purchase_unit: "lb",
    purchase_price: 0,
    usage_unit: "lb",
    yield_rate: 0,
    updated_at: new Date(),
    created_at: new Date(),
    created_by: "",
  };
};
