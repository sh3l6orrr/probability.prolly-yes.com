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

export async function showPmf(formData) {
  const res = await fetch(url + '/probability/pmf', {
    method: 'POST',
    body: formData
  })
  let pmf
  try {
    pmf = await res.json()
  } catch (error) {
    return null
  }
  return pmf
}

export async function showCdf(formData) {
  const res = await fetch(url + '/probability/cdf', {
    method: 'POST',
    body: formData
  })
  let cdf
  try {
    cdf = await res.json()
  } catch (error) {
    return null
  }
  return cdf
}

export async function getMoments(formData) {
  const res = await fetch(url + '/probability/moments', {
    method: 'POST',
    body: formData
  })
  let pdf
  try {
    pdf = await res.text()
    const sanitized = pdf.replace(/NaN/g, '"NaN"').replace(/Infinity/g, '"Infinity"')
    pdf = JSON.parse(sanitized);
  } catch (error) {
    return null
  }
  return pdf
}