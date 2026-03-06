import { ImageIcon } from 'lucide-react';
import { ObjectPublicDTO } from '../model/types';
import Image from 'next/image';

interface ObjectItemProps {
  object: ObjectPublicDTO;
}

export default function ObjectItem({ object }: ObjectItemProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 lg:gap-12 mb-4 p-4">
      {object.image ? (
        <Image
          className="w-full aspect-video md:h-64 rounded-md"
          src={object.image.url}
          alt={object.name}
          height={300}
          width={400}
          priority
        />
      ) : (
        <div className="w-full h-56 aspect-video md:h-64 bg-muted rounded-md flex items-center justify-center">
          <ImageIcon className="h-1/4 w-1/4 text-muted-foreground/50" />
        </div>
      )}

      <div className="flex flex-col gap-4 w-full h-full">
        <h1 className="text-xl font-bold w-full">{object.name}</h1>
        <div className="w-full flex flex-col gap-1 whitespace-pre-wrap">
          {object.description}
        </div>
      </div>
    </div>
  );
}
