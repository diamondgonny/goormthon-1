import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

function Notice({ title, content, date, category }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="mb-4 cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2 line-clamp-2">{content}</p>
            <span className="inline-block px-2 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
              {category}
            </span>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>{date}</span>
            <span className="px-2 py-1 bg-gray-200 rounded-full">
              {category}
            </span>
          </div>
        </DialogHeader>
        <div className="mt-4">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function NoticeBoard() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "미국 LA 직항 노선 증편 안내",
      content:
        "2024년 3월부터 LA 직항 노선이 주 5회에서 매일 운항으로 증편됩니다. 증편을 기념하여 LA 왕복 항공권 특가 프로모션을 진행하오니 많은 관심 부탁드립니다.",
      date: "2024-02-15",
      category: "노선안내",
    },
    {
      id: 2,
      title: "영국 런던 봄 여행 특가 패키지",
      content:
        "런던의 아름다운 봄을 만끽할 수 있는 10일 일정 패키지를 출시했습니다. 버킹엄 궁전 근위병 교대식, 코츠월즈 당일치기 등 다양한 관광이 포함되어 있습니다. 3월 출발 기준 얼리버드 할인 진행중입니다.",
      date: "2024-03-20",
      category: "상품안내",
    },
    {
      id: 3,
      title: "독일 맥주축제 옥토버페스트 특별 상품",
      content:
        "2024년 뮌헨 옥토버페스트 특별 상품이 오픈되었습니다. 축제 입장권과 뮌헨 시내 4성급 호텔 숙박이 포함된 패키지로, 조기 예약 시 축제 전용 티셔츠를 증정해드립니다.",
      date: "2024-05-01",
      category: "축제특가",
    },
    {
      id: 4,
      title: "미국 국립공원 여름 투어 프로모션",
      content:
        "옐로스톤, 그랜드캐년, 요세미티를 모두 관람할 수 있는 15일 일정의 미국 국립공원 투어 상품을 출시했습니다. 6월 출발 기준 커플 예약 시 1인 30% 할인 혜택을 드립니다.",
      date: "2024-06-01",
      category: "프로모션",
    },
    {
      id: 5,
      title: "영국-독일 연계 투어 신규 출시",
      content:
        "런던에서 시작하여 프랑크푸르트에서 끝나는 13일 일정의 연계 투어가 신규 출시되었습니다. 영국 코츠월즈, 독일 로맨틱가도를 모두 경험할 수 있는 알찬 일정입니다.",
      date: "2024-08-15",
      category: "신규상품",
    },
    {
      id: 6,
      title: "독일 가을 로맨틱가도 투어",
      content:
        "가을 정취 가득한 독일 로맨틱가도를 따라가는 8일 일정 상품입니다. 뉘른베르크, 뷔르츠부르크, 로텐부르크 등 중세 도시들의 아름다움을 만끽하실 수 있습니다.",
      date: "2024-09-10",
      category: "상품안내",
    },
    {
      id: 7,
      title: "미국 뉴욕 연말 패키지 특가",
      content:
        "타임스퀘어 새해 카운트다운을 포함한 뉴욕 연말 패키지를 선보입니다. 브로드웨이 뮤지컬 관람과 자유의 여신상 크루즈 등 풍성한 일정으로 구성되어 있습니다.",
      date: "2024-11-15",
      category: "연말특가",
    },
  ]);

  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNotice.title && newNotice.content && newNotice.category) {
      const date = new Date().toISOString().split("T")[0];
      setNotices([...notices, { ...newNotice, id: Date.now(), date }]);
      setNewNotice({ title: "", content: "", category: "" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notice Board</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Notice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Notice</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Notice Title"
                  value={newNotice.title}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Notice Content"
                  value={newNotice.content}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, content: e.target.value })
                  }
                  required
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <Input
                  placeholder="Category"
                  value={newNotice.category}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, category: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit">Add Notice</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {[...notices]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((notice) => (
            <Notice key={notice.id} {...notice} />
          ))}
      </div>
    </div>
  );
}
