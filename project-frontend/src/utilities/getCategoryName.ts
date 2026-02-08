import { getAllCategories } from '../components/api/Category';

interface Category {
    id: number;
    category: string;
}

const getCategoryName = async (
    categoryId: number
): Promise<string | undefined> => {
    const categories: Category[] = await getAllCategories();

    return categories.find((c) => c.id === categoryId)?.category;
};

export default getCategoryName;
