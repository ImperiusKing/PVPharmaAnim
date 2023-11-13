import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/Tabs";

export default function About() {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full">
        {/* News Section */}
        <div className="relative overflow-hidden bg-[#F5F5F5] w-full">
          <div className="py-16">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="w-[60%] mx-auto text-center">
                <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-6xl">
                  VỀ DƯỢC PHÚC VINH
                </h1>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                  Trong vòng hơn hai thập kỷ phát triển và đổi mới không ngừng,
                  PVPharma đã trở thành một trong những công ty dược phẩm hàng
                  đầu tại Việt Nam.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs Section */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="tab1" className="mt-8">
            <div className="flex justify-center">
              <TabsList className="inline-flex border-b border-gray-300">
                <TabsTrigger value="tab1" className="text-[1.1rem]">
                  Category 1
                </TabsTrigger>
                <TabsTrigger value="tab2" className="text-[1.1rem]">
                  Category 2
                </TabsTrigger>
                <TabsTrigger value="tab3" className="text-[1.1rem]">
                  Category 3
                </TabsTrigger>
                <TabsTrigger value="tab4" className="text-[1.1rem]">
                  Category 4
                </TabsTrigger>
                <TabsTrigger value="tab5" className="text-[1.1rem]">
                  Category 5
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="flex justify-center mt-2">
              <TabsContent value="tab1">
                <p>Content for Category 1</p>
              </TabsContent>
              <TabsContent value="tab2">
                <p>Content for Category 2</p>
              </TabsContent>
              <TabsContent value="tab3">
                <p>Content for Category 3</p>
              </TabsContent>
              <TabsContent value="tab4">
                <p>Content for Category 4</p>
              </TabsContent>
              <TabsContent value="tab5">
                <p>Content for Category 5</p>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
