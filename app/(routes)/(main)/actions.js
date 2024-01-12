'use server'

import url from "../url"

export async function showPdf(data) {
  const res = await fetch(url + '/probability/pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  let pdf
  try {
    pdf = await res.json()
  } catch (error) {
    return null
  }
  return pdf
}

export async function showPmf(data) {
  const res = await fetch(url + '/probability/pmf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let pmf
  try {
    pmf = await res.json()
  } catch (error) {
    return null
  }
  return pmf
}

export async function showCdf(data) {
  const res = await fetch(url + '/probability/cdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let cdf
  try {
    cdf = await res.json()
  } catch (error) {
    return null
  }
  return cdf
}
export async function showPdfFormula(data) {
  const res = await fetch(url + '/probability/pdf/formula', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  let pdf
  try {
    pdf = await res.text()
  } catch (error) {
    return null
  }
  return pdf
}
export async function showPmfFormula(data) {
  const res = await fetch(url + '/probability/pmf/formula', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  let pdf
  try {
    pdf = await res.text()
  } catch (error) {
    return null
  }
  return pdf
}

export async function showCdfFormula(data) {
  const res = await fetch(url + '/probability/cdf/formula', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let cdf
  try {
    cdf = await res.text()
  } catch (error) {
    return null
  }
  return cdf
}

export async function getMoments(data) {
  const res = await fetch(url + '/probability/moments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let general
  try {
    general = await res.text()
    const sanitized = general.replace(/NaN/g, '"NaN"').replace(/-Infinity/g, '"-\\\\infty"').replace(/Infinity/g, '"\\\\infty"')
    general = JSON.parse(sanitized);
  } catch (error) {
    return null
  }
  return general
}

export async function calcPdf(data) {
  const res = await fetch(url + '/probability/calc_pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  let val
  try {
    val = await res.json()
  } catch (error) {
    return null
  }
  return val
}
export async function calcCdf(data) {
  const res = await fetch(url + '/probability/calc_cdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  let val
  try {
    val = await res.json()
  } catch (error) {
    return null
  }
  return val
}
export async function calcPpf(data) {
  const res = await fetch(url + '/probability/calc_ppf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  let val
  try {
    val = await res.json()
  } catch (error) {
    return null
  }
  return val
}

export async function getSampling(data) {
  const res = await fetch(url + '/probability/sampling', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    cache: 'no-store'
  })
  let sampling
  try {
    sampling = await res.json()
  } catch (error) {
    return null
  }
  return sampling
}