import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosinstans';

export default function useProducts({
  page = 1,
  limit = 3,
  sortBy = 'price',
  ascending = false,
} = {}) {
  const getProducts = async () => {
    try {
      const response = await axiosInstance.get('/Products', {
        params: { page, limit, sortBy, ascending },
      });

     return response.data.response.data
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const query = useQuery({
    queryKey: ['products', page, limit, sortBy, ascending],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });

  return query;
}
