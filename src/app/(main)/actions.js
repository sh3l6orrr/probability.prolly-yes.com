'use server'

import url from "@/url"

export async function showPdf(formData) {
  const res = await fetch(url + '/probability/pdf', {
    method: 'POST',
    body: formData
  })
  let pdf
  try {
    pdf = await res.json()
  } catch (error) {
    return null
  }
  return pdf
}