'use server'

// const url = 'https://api.prolly-yes.com'
const url = 'http://localhost:5001'

export async function fetchProbability(data, route) {
  const res = await fetch(url + `/probability${route}`, {
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