import axiosInstance from 'Configs'

export interface Location {
  SEARCHVAL: string
  ADDRESS?: string
  LATTITUDE: string
  LONGTITUDE: string
}

interface SearchResponse {
  data: {
    results: Location[]
    message: string
    status: string
  }
}

export const searchLocationsFn = async (searchVal: string): Promise<SearchResponse> => {
  try {
    const response = await axiosInstance.get('api/search', {
      params: { searchVal },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
