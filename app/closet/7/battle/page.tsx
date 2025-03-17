"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Volume2, VolumeX, ArrowLeft, Home, Check } from "lucide-react"

export default function Stage7BattlePage() {
  const [isMuted, setIsMuted] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [rackLength, setRackLength] = useState("")
  const [hangerCount, setHangerCount] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const router = useRouter()

  // Initialize audio
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Create audio element
        const audio = new Audio()

        // Set up event listeners
        audio.addEventListener("canplaythrough", () => {
          setAudioLoaded(true)
          if (!isMuted) {
            audio.play().catch((e) => {
              console.log("Audio play was prevented: ", e)
              // This is often due to browser autoplay policies
            })
          }
        })

        audio.addEventListener("error", (e) => {
          console.log("Audio loading error: ", e)
          setAudioLoaded(false)
        })

        // Set properties
        audio.src = "/stepfight_7.mp3"
        audio.loop = true
        audio.volume = 0.7 // Set to 70% volume
        audio.muted = isMuted

        // Store reference
        audioRef.current = audio

        // Clean up
        return () => {
          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.src = ""
            audioRef.current = null
          }
        }
      } catch (error) {
        console.error("Audio initialization error:", error)
      }
    }
  }, [])

  // Toggle mute
  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)

    if (audioRef.current) {
      audioRef.current.muted = newMutedState

      // If unmuting and audio is loaded but not playing, try to play
      if (!newMutedState && audioLoaded && audioRef.current.paused) {
        audioRef.current.play().catch((e) => {
          console.log("Audio play was prevented on unmute: ", e)
        })
      }
    }
  }

  // Calculate hanger count when rack length changes
  useEffect(() => {
    if (rackLength && !isNaN(Number.parseFloat(rackLength))) {
      const count = Number.parseFloat(rackLength) * 0.27
      setHangerCount(Math.round(count * 10) / 10) // Round to 1 decimal place
    } else {
      setHangerCount(null)
    }
  }, [rackLength])

  // Save record to database and navigate to clear page
  const saveRecord = async () => {
    setIsSaving(true)

    try {
      // Simulate saving to database
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would save the data to your database here
      console.log("Saving record:", {
        rackLength,
        hangerCount,
      })

      // Navigate to clear page
      router.push("/closet/7/clear")
    } catch (error) {
      console.error("Error saving record:", error)
      alert("保存中にエラーが発生しました。もう一度お試しください。")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-teal-950 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900 via-teal-900 to-purple-900 p-3 flex justify-between items-center border-b-2 border-yellow-500 shadow-md relative">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500"></div>

        <div className="flex items-center gap-2">
          <Link href="/closet/7">
            <Button
              variant="outline"
              size="icon"
              className="bg-purple-800 border-yellow-600 text-white hover:bg-purple-700 h-8 w-8 sm:h-10 sm:w-10"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
          <div className="flex items-center">
            <span className="text-lg sm:text-2xl font-bold text-yellow-300 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)] px-2">
              限界の迷宮 - 戦闘フェーズ
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-purple-800 border-yellow-600 text-white hover:bg-purple-700 h-8 w-8 sm:h-10 sm:w-10"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>
          <Link href="/home">
            <Button
              variant="outline"
              size="icon"
              className="bg-purple-800 border-yellow-600 text-white hover:bg-purple-700 h-8 w-8 sm:h-10 sm:w-10"
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center p-4 overflow-auto">
        <div className="max-w-2xl w-full bg-gradient-to-b from-purple-900 to-teal-900 rounded-lg p-6 border-2 border-yellow-500 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">適正量を把握しよう</h2>

          {/* Check 1 */}
          <div className="mb-8 bg-teal-800 bg-opacity-50 p-5 rounded-lg border border-teal-700">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">チェック１</h3>
            <p className="text-white mb-4">まずハンガーラックの長さから服の適正量を出してみよう</p>

            <div className="mb-4">
              <label htmlFor="rack-length" className="block text-white mb-2">
                ハンガーラックの横幅を測って記入してください
              </label>
              <div className="flex items-center">
                <Input
                  id="rack-length"
                  type="number"
                  value={rackLength}
                  onChange={(e) => setRackLength(e.target.value)}
                  className="max-w-[120px] bg-teal-950 border-yellow-500 text-white"
                  placeholder="0"
                />
                <span className="ml-2 text-white">cm</span>
              </div>
            </div>

            <div className="p-4 bg-teal-900 bg-opacity-50 rounded-lg">
              <p className="text-white">
                あなたのハンガーラックにかけるハンガーの本数は…
                <br />
                <span className="text-yellow-300 font-bold text-xl">
                  {hangerCount !== null ? `${hangerCount}` : "___"} 本です！
                </span>
              </p>

              <p className="mt-4 text-white">
                もし大幅にオーバーしていたら、
                <br />
                いらない服→<span className="text-red-400 font-bold">「虚無の箱」</span>へ
                <br />
                捨てるか迷う服→<span className="text-amber-400 font-bold">「運命の箱」</span>へ
                <br />
                移動しよう！
              </p>
            </div>
          </div>

          {/* Check 2 */}
          <div className="mb-8 bg-teal-800 bg-opacity-50 p-5 rounded-lg border border-teal-700">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">チェック２</h3>
            <p className="text-white mb-4">
              一年以上着ていない服はないかな？
              <br />
              この一年で着なかった服は思い切って<span className="text-red-400 font-bold">「虚無の箱」</span>へ入れよう！
            </p>
          </div>

          {/* Check 3 */}
          <div className="mb-8 bg-teal-800 bg-opacity-50 p-5 rounded-lg border border-teal-700">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">チェック３</h3>
            <p className="text-white mb-4">普段着は、「７日分＋２～３着」にすると着まわしやすいよ！</p>

            <div className="p-4 bg-teal-900 bg-opacity-50 rounded-lg">
              <p className="text-teal-300">
                <span className="font-bold">📌 例：最小限のワードローブ例</span>
                <br />✅ トップス（7～10枚）
                <br />✅ ボトムス（3～5枚）
                <br />✅ アウター（2～4着）
                <br />✅ 下着類（10～12着）
              </p>
            </div>

            <p className="mt-4 text-white">
              必要以上に持っているアイテムがあったら、<span className="text-red-400 font-bold">「虚無の箱」</span>
              へ入れよう！
            </p>
          </div>

          {/* Submit button */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={saveRecord}
              disabled={isSaving}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-purple-900 font-bold py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                "保存中..."
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  適正量に応じて整理完了！
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

