'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const categoriesList = ['Điện', 'Nước', 'Thiết bị vệ sinh', 'Dụng cụ cầm tay'];

const formSchema = z.object({
  storeName: z.string().min(2, {
    message: 'Vui lòng nhập tên cửa hàng.',
  }),
  phoneNumber: z.string().min(10, {
    message: 'Số điện thoại không hợp lệ.',
  }),
  area: z.string().min(2, {
    message: 'Vui lòng nhập khu vực.',
  }),
  categories: z.array(z.string()).min(1, {
    message: 'Vui lòng chọn ít nhất một ngành hàng.',
  }),
});

export default function ContactFormArea() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: '',
      phoneNumber: '',
      area: '',
      categories: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  return (
    <div className="flex flex-col justify-center col-span-3 p-8 md:p-12 xl:p-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground text-base">
                  Tên cửa hàng
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cửa hàng Điện nước Hùng Anh"
                    className="rounded-none focus-visible:ring-2 focus-visible:ring-offset-2 h-12 text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground text-base">
                  Số điện thoại
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="09xx xxx xxx"
                    className="rounded-none focus-visible:ring-2 focus-visible:ring-offset-2 h-12 text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground text-base">
                  Khu vực
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Vĩnh Bảo, Hải Phòng"
                    className="rounded-none focus-visible:ring-2 focus-visible:ring-offset-2 h-12 text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground text-base">
                  Ngành hàng quan tâm
                </FormLabel>
                <FormControl>
                  <div className="gap-0 grid grid-cols-2 xl:grid-cols-4 bg-muted/20 border border-border">
                    {categoriesList.map((cat, idx) => {
                      const isSelected = field.value.includes(cat);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            const newValue = isSelected
                              ? field.value.filter((c) => c !== cat)
                              : [...field.value, cat];
                            field.onChange(newValue);
                          }}
                          className={`h-12 px-2 text-sm text-center border-r border-b xl:border-b-0 border-border last:border-r-0 transition-colors ${
                            isSelected
                              ? 'bg-primary text-primary-foreground font-bold'
                              : 'text-foreground hover:bg-muted font-medium'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 pt-6">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 rounded-none w-full h-14 font-bold text-primary-foreground text-base"
            >
              Gửi thông tin nhận báo giá
            </Button>
            <Button
              type="button"
              className="bg-[#0068FF] hover:bg-[#0054cc] rounded-none w-full h-14 font-bold text-white text-base transition-colors"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Nhắn Zalo Duy Hoà
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
