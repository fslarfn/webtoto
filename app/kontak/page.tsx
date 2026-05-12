'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { MapPin, Phone, Clock, MessageCircle, Send } from 'lucide-react'
import { SITE, WA_URL } from '@/lib/constants'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Alamat Pabrik',
    content: SITE.address,
    link: 'https://maps.google.com/?q=Jl.+Rawa+Mulya+No.15+Mustika+Jaya+Bekasi',
  },
  {
    icon: Phone,
    title: 'WhatsApp / Telepon',
    content: SITE.phone,
    link: WA_URL,
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    content: 'Senin – Sabtu\n08.00 – 17.00 WIB',
    link: null,
  },
]

export default function KontakPage() {
  const [form, setForm] = useState({ nama: '', telepon: '', pesan: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const msg = `Halo, nama saya ${form.nama}.\nNo. HP: ${form.telepon}\n\nPesan: ${form.pesan}`
    window.open(`https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
    setForm({ nama: '', telepon: '', pesan: '' })
  }

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <div className="bg-[#7B3F00] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Hubungi Kami</h1>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto">
            Konsultasi gratis untuk kebutuhan kusen aluminium Anda. Kami siap membantu.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#7B3F00] mb-6">Informasi Kontak</h2>
            <div className="space-y-5 mb-8">
              {contactInfo.map(({ icon: Icon, title, content, link }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F9F6F2] flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-[#7B3F00]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{title}</p>
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 text-sm hover:text-[#7B3F00] whitespace-pre-line"
                      >
                        {content}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-sm whitespace-pre-line">{content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Maps Embed */}
            <div className="rounded-2xl overflow-hidden shadow-md h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.312!2d107.0086!3d-6.2797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTYnNDYuOSJTIDEwN8KwMDAnMzEuMCJF!5e0!3m2!1sid!2sid!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi CV Toto Aluminium Manufacture Bekasi"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#7B3F00] mb-6">Kirim Pesan</h2>
            {sent ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <MessageCircle size={40} className="text-[#7B3F00] mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">Pesan Dikirim!</h3>
                <p className="text-gray-600 text-sm">
                  Anda akan diarahkan ke WhatsApp. Kami akan segera merespons pesan Anda.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-sm text-[#7B3F00] font-semibold hover:underline"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="telepon"
                    value={form.telepon}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: 08123456789"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Pesan / Kebutuhan *
                  </label>
                  <textarea
                    name="pesan"
                    value={form.pesan}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Ceritakan kebutuhan kusen aluminium Anda (ukuran, desain, jumlah, dll)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#7B3F00] text-white font-bold rounded-xl hover:bg-[#6A3500] transition-colors"
                >
                  <Send size={18} />
                  Kirim via WhatsApp
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Pesan akan dikirim melalui WhatsApp. Respon dalam 1-2 jam pada hari kerja.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
