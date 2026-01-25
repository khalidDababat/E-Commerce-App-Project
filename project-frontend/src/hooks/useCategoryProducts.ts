import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch products based on a category name.
 * @param categoryName - The name of the category to filter products by.
 * @returns { products, loading, error } - An object containing the list of products, loading state, and any error that occurred.
 */
export const useCategoryProducts = (categoryName: string) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            if (!categoryName) {
                setProducts([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const baseUrl = process.env.REACT_APP_BACKEND_UR;

                const response = await fetch(
                    `${baseUrl}/productsByCategoryName`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ category: categoryName }),
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch products: ${response.statusText}`
                    );
                }

                const data = await response.json();
                // Ensure data is an array
                setProducts(Array.isArray(data) ? data : []);
            } catch (err: any) {
                console.error('Error fetching products by category:', err);
                setError(err.message || 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [categoryName]);

    return { products, loading, error };
};
