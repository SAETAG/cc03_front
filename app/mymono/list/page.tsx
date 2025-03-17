"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data for items
const mockItems = [
  {
    id: 1,
    title: "シルクブラウス",
    image: "/placeholder.svg?height=300&width=200",
    description: "春に購入したお気に入りのシルクブラウス。淡いピンク色で、どんなボトムスとも合わせやすい。",
    category: "洋服",
    date: "2023-04-15",
  },
  {
    id: 2,
    title: "デニムジャケット",
    image: "/placeholder.svg?height=300&width=200",
    description: "3年前に購入した定番のデニムジャケット。少し色落ちしてきたが、それがまた味になっている。",
    category: "洋服",
    date: "2020-09-22",
  },
  {
    id: 3,
    title: "ウールコート",
    image: "/placeholder.svg?height=300&width=200",
    description: "冬の定番アイテム。ダークグレーで、どんなコーディネートにも合わせやすい。",
    category: "洋服",
    date: "2022-11-10",
  },
  {
    id: 4,
    title: "カシミアセーター",
    image: "/placeholder.svg?height=300&width=200",
    description: "誕生日プレゼントでもらった高級カシミアセーター。とても暖かく、肌触りも最高。",
    category: "洋服",
    date: "2023-01-05",
  },
  {
    id: 5,
    title: "レザーバッグ",
    image: "/placeholder.svg?height=300&width=200",
    description: "就職祝いに自分へのご褒美として購入したレザーバッグ。年々味が出てきている。",
    category: "アクセサリー",
    date: "2021-03-15",
  },
  {
    id: 6,
    title: "サマードレス",
    image: "/placeholder.svg?height=300&width=200",
    description: "去年の夏に購入した花柄のドレス。海辺でのパーティーに着ていった思い出の一着。",
    category: "洋服",
    date: "2022-07-08",
  },
]

// Add mock data for the trophy
const mockTrophyData = {
  before: {
    image: "/placeholder.svg?height=400&width=600",
    dissatisfaction:
      "・服が多すぎて何があるか把握できない\n・季節の服が混ざっている\n・よく着る服とそうでない服の区別がつかない",
    ideal: "・一目で何があるかわかる\n・季節ごとに整理されている\n・よく着る服が取り出しやすい",
  },
  after: {
    image: "/placeholder.svg?height=400&width=600",
    careful_points: "・カテゴリーごとに分ける\n・使用頻度で配置を考える\n・定期的に見直しをする",
  },
}

// Update the Item interface to include optional fields
interface Item {
  id: number
  title: string
  image: string
  description: string
  category?: string
  date?: string
}

export default function MyMonoListPage() {
  const [isMuted, setIsMuted] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isTrophyDialogOpen, setIsTrophyDialogOpen] = useState(false)
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [items, setItems] = useState(mockItems)
  const [newItem, setNewItem] = useState<{
    title: string
    description: string
    image: string
  }>({
    title: "",
    description: "",
    image: "/placeholder.svg?height=300&width=200",
  })

  useEffect(() => {
    const audioElement = new Audio("/mymono.mp3")
    audioElement.loop = true
    setAudio(audioElement)

    try {
      audioElement.play().catch((error) => {
        console.log("Auto-play was prevented:", error)
      })
    } catch (error) {
      console.log("Audio play error:", error)
    }

    return () => {
      audioElement.pause()
      audioElement.src = ""
    }
  }, [])

  useEffect(() => {
    if (audio) {
      audio.muted = isMuted
    }
  }, [isMuted, audio])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const openItemDialog = (item: Item) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  const handleAddItem = () => {
    const newItemWithId: Item = {
      ...newItem,
      id: items.length + 1,
      category: "新規追加",
      date: new Date().toISOString().split("T")[0],
    }

    setItems([...items, newItemWithId])
    setIsAddItemDialogOpen(false)
    setNewItem({
      title: "",
      description: "",
      image: "/placeholder.svg?height=300&width=200",
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setNewItem({
            ...newItem,
            image: event.target.result as string,
          })
        }
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMute}
          className="bg-amber-100 border-amber-300 hover:bg-amber-200"
        >
          {isMuted ? "🔇" : "🔊"}
        </Button>
      </div>

      <div className="absolute top-4 left-4 z-10">
        <Link href="/mymono">
          <Button variant="outline" size="sm" className="bg-amber-100 border-amber-300 hover:bg-amber-200">
            ← 入口に戻る
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-8 text-center">
          金の蔵 - コレクションギャラリー
        </h1>

        {/* Trophy Section */}
        <div className="w-full max-w-6xl mx-auto mb-12">
          <div
            className="trophy-container bg-gradient-to-r from-amber-100 to-yellow-100 p-6 rounded-lg border-2 border-amber-300 shadow-lg cursor-pointer flex items-center"
            onClick={() => setIsTrophyDialogOpen(true)}
          >
            <div className="trophy-icon text-6xl mr-4">🏆</div>
            <div>
              <h2 className="text-2xl font-bold text-amber-800">片づけトロフィー</h2>
              <p className="text-amber-700">クリックして片づけビフォー＆アフターを見る</p>
            </div>
          </div>
        </div>

        {/* Add Item Button */}
        <div className="w-full max-w-6xl mx-auto mb-8 flex justify-end">
          <Button onClick={() => setIsAddItemDialogOpen(true)} className="bg-amber-600 hover:bg-amber-700 text-white">
            ＋ 新しいアイテムを追加
          </Button>
        </div>

        {/* Existing items grid */}
        <div className="w-full max-w-6xl mx-auto bg-amber-50 rounded-lg p-8 shadow-lg border-2 border-amber-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item.id} className="cursor-pointer" onClick={() => openItemDialog(item)}>
                <div className="frame-container">
                  <div className="antique-frame">
                    <div className="frame-inner">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={200}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="text-lg font-semibold text-amber-800">{item.title}</h3>
                    <p className="text-sm text-amber-600">
                      {item.category} • {item.date}
                    </p>
                  </div>
                  <Card className="mt-2 p-3 bg-amber-50 border border-amber-200 text-sm text-amber-700 h-24 overflow-hidden">
                    <p className="line-clamp-3">{item.description}</p>
                    <p className="text-right text-xs text-amber-500 mt-1">クリックで詳細表示</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedItem && (
          <DialogContent className="max-w-3xl bg-amber-50 border-4 border-amber-300">
            <DialogHeader>
              <DialogTitle className="text-2xl text-amber-800">{selectedItem.title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col md:flex-row gap-6 p-4">
              <div className="antique-frame-large md:w-1/2">
                <div className="frame-inner">
                  <Image
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.title}
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <Card className="p-4 bg-amber-50 border border-amber-200">
                  <h4 className="font-semibold text-amber-700 mb-2">詳細情報</h4>
                  <p className="text-amber-800 mb-4">{selectedItem.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-amber-600">カテゴリー:</div>
                    <div className="text-amber-800">{selectedItem.category}</div>

                    <div className="text-amber-600">登録日:</div>
                    <div className="text-amber-800">{selectedItem.date}</div>
                  </div>
                </Card>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Trophy Dialog */}
      <Dialog open={isTrophyDialogOpen} onOpenChange={setIsTrophyDialogOpen}>
        <DialogContent className="max-w-4xl bg-amber-50 border-4 border-amber-300">
          <DialogHeader>
            <DialogTitle className="text-2xl text-amber-800">片づけトロフィー</DialogTitle>
            <DialogDescription className="text-amber-600">クローゼット整理のビフォー＆アフター</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="before" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="before">ビフォー</TabsTrigger>
              <TabsTrigger value="after">アフター</TabsTrigger>
            </TabsList>

            <TabsContent value="before" className="p-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="antique-frame-large">
                    <div className="frame-inner">
                      <Image
                        src={mockTrophyData.before.image || "/placeholder.svg"}
                        alt="片づけ前のクローゼット"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <Card className="p-4 bg-amber-50 border border-amber-200 mb-4">
                    <h4 className="font-semibold text-amber-700 mb-2">不満点</h4>
                    <pre className="text-amber-800 whitespace-pre-line">{mockTrophyData.before.dissatisfaction}</pre>
                  </Card>
                  <Card className="p-4 bg-amber-50 border border-amber-200">
                    <h4 className="font-semibold text-amber-700 mb-2">理想</h4>
                    <pre className="text-amber-800 whitespace-pre-line">{mockTrophyData.before.ideal}</pre>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="after" className="p-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="antique-frame-large">
                    <div className="frame-inner">
                      <Image
                        src={mockTrophyData.after.image || "/placeholder.svg"}
                        alt="片づけ後のクローゼット"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <Card className="p-4 bg-amber-50 border border-amber-200">
                    <h4 className="font-semibold text-amber-700 mb-2">気をつけたこと</h4>
                    <pre className="text-amber-800 whitespace-pre-line">{mockTrophyData.after.careful_points}</pre>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent className="max-w-2xl bg-amber-50 border-4 border-amber-300">
          <DialogHeader>
            <DialogTitle className="text-2xl text-amber-800">新しいアイテムを追加</DialogTitle>
            <DialogDescription className="text-amber-600">コレクションに新しいアイテムを追加します</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 flex flex-col items-center">
                <div className="antique-frame mb-4">
                  <div className="frame-inner">
                    <Image
                      src={newItem.image || "/placeholder.svg"}
                      alt="新しいアイテム"
                      width={200}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <Label htmlFor="image" className="text-amber-700">
                    アイテム写真
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="bg-white border-amber-200"
                  />
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="title" className="text-amber-700">
                      アイテム名
                    </Label>
                    <Input
                      id="title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      className="bg-white border-amber-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-amber-700">
                      説明
                    </Label>
                    <Textarea
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="bg-white border-amber-200 min-h-[150px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAddItem}
              className="bg-amber-600 hover:bg-amber-700 text-white"
              disabled={!newItem.title || !newItem.description}
            >
              追加する
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .frame-container {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .frame-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(180, 83, 9, 0.2);
        }
        
        .antique-frame {
          background-color: #8B4513;
          padding: 12px;
          border-radius: 2px;
          box-shadow: 
            inset 0 0 0 1px #D2B48C,
            inset 0 0 0 5px #8B4513,
            inset 0 0 0 6px #D2B48C,
            0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .antique-frame-large {
          background-color: #8B4513;
          padding: 16px;
          border-radius: 2px;
          box-shadow: 
            inset 0 0 0 1px #D2B48C,
            inset 0 0 0 8px #8B4513,
            inset 0 0 0 9px #D2B48C,
            0 6px 12px rgba(0, 0, 0, 0.3);
        }
        
        .frame-inner {
          border: 1px solid #D2B48C;
          padding: 4px;
          background-color: white;
        }

        .trophy-container:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
      `}</style>
    </main>
  )
}

