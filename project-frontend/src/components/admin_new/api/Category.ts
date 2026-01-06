import { toast } from "react-toastify";

export const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>, nameCategory: string) => {
    e.preventDefault();



    const res = await fetch(`${process.env.REACT_APP_BACKEND_UR}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ category: nameCategory }),
    }
    );

    if (!res.ok) {
        toast.error("Failed to add category", { position: "top-center" });

    } else {
        toast.success("Category added successfully", { position: "top-center" });

    }


    const data = await res.json();
    return data;




}

export const deleteCategory = async (id: string) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_UR}/categories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    }
    );

    if (!res.ok) {
        toast.error("Failed to delete category", { position: "top-center" });
    } else {
        toast.success("Category deleted successfully", { position: "top-center" });
    }

    const data = await res.json();
    return data;
}


export const getAllCategories = async () => {

    const res = await fetch(`${process.env.REACT_APP_BACKEND_UR}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }

    );

    const data = await res.json();
    return data;

}