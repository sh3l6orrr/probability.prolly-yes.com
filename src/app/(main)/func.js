import { showPdf } from "./actions"

export async function renderPlot(distr, params) {
  let formData = new FormData()
  for (const key in params) formData.append(key, params[key])
  formData.append('distr', distr)
  const data = await showPdf(formData)
  if (data) await vegaEmbed('#plot', data)
}