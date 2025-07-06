'use client';

import { useGetImagesQuery } from '../redux/api/unsplashApi';
import GalleryItem from './GalleryItem';

type Props = {
  query?: string;
  page?: number;
};

export default function Gallery({ query = 'space', page = 1 }: Props) {
  
  const finalQuery = query?.trim() || 'space';
  const { data, isLoading, error } = useGetImagesQuery({ query: finalQuery, page });


  if (isLoading) return <p className="p-6 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 p-6 text-center">Error loading images.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {data?.results?.map((img: { id: string; urls: { small: string }; alt_description: string | null; user: { name: string } }) => (
        <GalleryItem
          id={img.id}
          key={img.id}
          src={img.urls.small}
          title={img.alt_description || 'Untitled'}
          author={img.user.name}
        />
      ))}
    </div>
  );
}
