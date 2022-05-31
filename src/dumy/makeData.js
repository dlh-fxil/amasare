import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}
function pad (str, max) {
  str = (str).toString();
  return str.length < max ? pad("0" + str, max) : str;
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
//     i.	URUSAN/UNSUR
// ii.	BIDANG URUSAN/BIDANG UNSUR
// iii.	PROGRAM
// iv.	KEGIATAN
// v.	SUB KEGIATAN
// vi.	NOMENKLATUR URUSAN KABUPATEN/KOTA
// vii.	KINERJA
// viii.	INDIKATOR
// ix.	SATUAN
// x.	Tahun_anggaran
// xi.	Anggaran
// xii.	Waktu Pelaksanaan
// xiii.	Unit Pelaksana

    urusan:pad(Math.floor(Math.random() * 10) + 1,2),
    bidang_urusan:pad(Math.floor(Math.random() * 10) + 1,3),
    program:pad(Math.floor(Math.random() * 10) + 1,3),
    kegiatan:pad(Math.floor(Math.random() * 10) + 1,3),
    sub_kegiatan:pad(Math.floor(Math.random() * 10) + 1,3),
    nomenklatur: namor.generate({ words: 4 }),
    kinerja: namor.generate({ words: 4 }),
    indikator: namor.generate({ words: 2 }),
    satuan: namor.generate({ words: 1, numbers:0}),
    tahun_anggaran: 2021,
    biaya: namor.generate({ numbers: 6 }),
    waktu: Math.floor(Math.random() * 10)+' Bulan',
    unit_pelaksana: namor.generate({ words: 1 }),
    jumlah_satuan: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
