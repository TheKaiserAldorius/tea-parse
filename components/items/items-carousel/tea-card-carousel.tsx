'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TeaCardCarousel({
  header,
  link,
  src,
}: {
  header: string;
  link: string;
  src: string;
}) {
  return (
    <Card className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-[2px] hover:shadow-md">
      <Link href={link} className="block">
        <CardContent className="p-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={src}
              alt={header}
              fill
              sizes="(min-width: 1024px) 25vw, 60vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              // важно: если src битый, Next всё равно попытается загрузить,
              // но хотя бы будет нормальная заглушка на уровне URL
              onError={(e) => {
                // next/image не даёт просто сменить src как у <img>,
                // поэтому fallback лучше решать корректным src сразу (см. ниже про placeholder)
              }}
              priority={false}
            />

            {/* лёгкий градиент для читабельности */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          </div>

          <div className="mt-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium leading-5">
                {header}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Смотреть товар
              </div>
            </div>

            <Button
              variant="secondary"
              className="h-8 shrink-0 rounded-full px-3 text-xs"
              asChild
            >
              <span>→</span>
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
