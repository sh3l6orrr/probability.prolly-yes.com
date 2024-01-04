const distriConfig = {
  norm: {
    name: 'Normal',
    label: '\\mathcal{N}',
    type: 'continuous',
    pdf: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}',
    cdf: "F(x) = \\frac{1}{2} \\left[1 + \\text{erf}\\left(\\frac{x - \\mu}{\\sigma \\sqrt{2}}\\right)\\right]",
    params: {
      loc: {
        label: '\\mu',
        default: 0,
        min: -10,
        max: 10,
        step: 1
      },
      scale: {
        label: '\\sigma^2',
        default: 1,
        min: 0,
        max: 10,
        step: 1
      }
    }
  },
  t: {
    name: "Student's t",
    label: 't',
    type: 'continuous',
    pdf: 'f(t) = \\frac{\\Gamma\\left(\\frac{\\nu + 1}{2}\\right)}{\\sqrt{\\nu \\pi} \\, \\Gamma\\left(\\frac{\\nu}{2}\\right)} \\left(1 + \\frac{t^2}{\\nu}\\right)^{-\\frac{\\nu + 1}{2}}',
    cdf: "F(x) =\\frac{1}{2} + \\frac{1}{2} \\cdot \\text{sgn}(t) \\cdot I_{\\frac{\\nu}{2}, \\frac{1}{2}}\\left(\\frac{\\nu}{1 + t^2}\\right)",
    params: {
      df: {
        label: '\\nu',
        default: 10,
        min: 1,
        max: 30,
        step: 1
      }
    }
  },
  binom: {
    name: 'Binomial',
    label: 'B',
    type: 'discrete',
    pdf: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}',
    cdf: "P(X \\leq k) = \\sum_{i=0}^{k} \\binom{n}{i} p^i (1-p)^{n-i}",
    params: {
      n: {
        label: 'n',
        default: 10,
        min: 10,
        max: 50,
        step: 5
      },
      p: {
        label: 'p',
        default: 0.3,
        min: 0,
        max: 1,
        step: 0.1
      }
    }
  }
}


export default distriConfig