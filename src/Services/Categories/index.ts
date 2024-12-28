import axiosInstance from 'Configs'

export interface Category {
  id: number
  category_name: string
  chinese_cat_name: string
  filename: string
  mobile_filename: string
}

export interface CategoriesResponse {
  data: Category[]
}

export const featuredCategoriesFn = async (): Promise<CategoriesResponse> => {
  try {
    const response = await axiosInstance.get('api/category-list-featured-attraction')
    return response.data
  } catch (error) {
    throw error
  }
}
