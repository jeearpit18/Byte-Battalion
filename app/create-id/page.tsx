'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DevIdCard } from '@/components/DevIdCard';
import { generateDevId, slugify } from '@/lib/utils';
import { useAppStore } from '@/lib/state';
import { useToast } from '@/hooks/useToast';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  handle: z
    .string()
    .min(3, 'Handle must be at least 3 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'Handle can only contain lowercase letters, numbers, and hyphens'
    ),
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

export default function CreateIdPage() {
  const router = useRouter();
  const { toast } = useToast();
  const setUser = useAppStore((s) => s.setUser);
  const addUser = useAppStore((s) => s.addUser);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    const devId = generateDevId(data.name);
    const user = {
      ...data,
      devId,
      avatarUrl: '/avatars/default.svg',
      bio: '',
    };

    setUser(user);
    addUser(user);
    toast({
      title: 'Dev ID Created!',
      description: `Welcome to DevOrbit, ${data.name}`,
    });

    setTimeout(() => {
      router.push(`/profile/${devId}`);
    }, 500);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (!watchedValues.handle) {
      setValue('handle', slugify(name.split(' ')[0] || ''));
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-muted hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-step-3 font-bold">Create your Dev ID</h1>
          <p className="text-muted">
            Join the orbit and start mapping your tech journey
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-xl border border-outline bg-surface/50 p-6 backdrop-blur-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register('name')}
                  onChange={(e) => {
                    register('name').onChange(e);
                    handleNameChange(e);
                  }}
                  placeholder="Ankit Sharma"
                />
                {errors.name && (
                  <p className="text-sm text-danger">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="handle">Handle</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted">@</span>
                  <Input
                    id="handle"
                    {...register('handle')}
                    placeholder="ankit"
                  />
                </div>
                {errors.handle && (
                  <p className="text-sm text-danger">{errors.handle.message}</p>
                )}
                <p className="text-xs text-muted">
                  Pick a handle you can say out loud.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="ankit@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-danger">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-3 rounded-lg bg-elev p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-orbit-2" />
                  Quick Tips
                </p>
                <ul className="space-y-1 text-sm text-muted">
                  <li>
                    • Link your GitHub now to auto-pull highlights (optional)
                  </li>
                  <li>• You control what&apos;s public — always</li>
                  <li>• Your Dev ID is permanent and verifiable</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Dev ID'}
              </Button>
            </form>
          </div>

          {/* Preview */}
          <div className="flex items-center justify-center">
            {watchedValues.name ? (
              <DevIdCard
                devId={generateDevId(watchedValues.name)}
                name={watchedValues.name}
                handle={watchedValues.handle || slugify(watchedValues.name)}
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-outline p-8 text-center">
                <p className="text-muted">
                  Fill in your details to see a preview
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
