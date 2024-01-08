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
        step: 1,
      },
      scale: {
        label: '\\sigma',
        default: 1,
        min: 0,
        max: 10,
        step: 1,
      }
    },
    sympy: {
      name: 'Normal',
      params: {
        loc: 'mean',
        scale: 'std'
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
  },
  poisson: {
    name: 'Poisson',
    label: 'Pois',
    type: 'discrete',
    pdf: 'P(X = k) = \\frac{e^{-\\mu} \\mu^k}{k!}',
    cdf: 'P(X \\leq k) = \\sum_{i=0}^{k} \\frac{e^{-\\mu} \\mu^i}{i!}',
    params: {
      mu: {
        label: '\\mu',
        default: 3,
        min: 1,
        max: 10,
        step: 1
      }
    }
  },
  expon: {
    name: 'Exponential',
    label: 'Exp',
    type: 'continuous',
    pdf: 'f(x) = \\lambda e^{-\\lambda x}',
    cdf: 'F(x) = 1 - e^{-\\lambda x}',
    params: {
      scale: {
        label: '1 / \\lambda',
        default: 0.5,
        min: 0.1,
        max: 2,
        step: 0.1
      }
    }
  },
  uniform: {
    name: 'Uniform',
    label: 'U',
    type: 'continuous',
    pdf: 'f(x) = \\frac{1}{b - a}',
    cdf: 'F(x) = \\frac{x - a}{b - a}',
    params: {
      loc: {
        label: 'a',
        default: 0,
        min: -5,
        max: 5,
        step: 1
      },
      scale: {
        label: 'b-a',
        default: 1,
        min: 1,
        max: 10,
        step: 1
      }
    }
  },
  chi2: {
    name: 'Chi-Squared',
    label: '\\chi^2',
    type: 'continuous',
    pdf: 'f(x) = \\frac{1}{2^{k/2}\\Gamma(k/2)}x^{k/2-1}e^{-x/2}',
    cdf: 'F(x) = \\frac{1}{\\Gamma(k/2)}\\gamma\\left(\\frac{k}{2}, \\frac{x}{2}\\right)',
    params: {
      df: {
        label: 'k',
        default: 3,
        min: 1,
        max: 10,
        step: 1
      }
    }
  },
  f: {
    name: 'F',
    label: 'F',
    type: 'continuous',
    pdf: 'f(x) = \\frac{1}{B(d_1/2, d_2/2)} \\left(\\frac{d_1}{d_2}\\right)^{d_1/2} x^{d_1/2-1} \\left(1 + \\frac{d_1}{d_2}x\\right)^{-(d_1+d_2)/2}',
    cdf: 'F(x) = I_{x}\\left(\\frac{d_1}{2}, \\frac{d_2}{2}\\right)',
    params: {
      dfn: {
        label: 'd_1',
        default: 5,
        min: 1,
        max: 10,
        step: 1
      },
      dfd: {
        label: 'd_2',
        default: 10,
        min: 1,
        max: 10,
        step: 1
      }
    }
  },
  beta: {
    name: 'Beta',
    label: 'Beta',
    type: 'continuous',
    pdf: 'f(x) = \\frac{x^{\\alpha-1}(1-x)^{\\beta-1}}{B(\\alpha, \\beta)}',
    cdf: 'F(x) = I_{x}(\\alpha, \\beta)',
    params: {
      a: {
        label: '\\alpha',
        default: 2,
        min: 1,
        max: 10,
        step: 1
      },
      b: {
        label: '\\beta',
        default: 5,
        min: 1,
        max: 10,
        step: 1
      }
    }
  },
  gamma: {
    name: 'Gamma',
    label: '\\Gamma',
    type: 'continuous',
    pdf: 'f(x) = \\frac{x^{\\alpha-1}e^{-\\beta x}\\beta^\\alpha}{ \\Gamma(\\alpha)}',
    cdf: 'F(x) = \\frac{1}{\\Gamma(\\alpha)} \\gamma\\left(\\alpha, \\beta x\\right)',
    params: {
      a: {
        label: '\\alpha',
        default: 2,
        min: 1,
        max: 10,
        step: 1
      },
      scale: {
        label: '1 / \\beta',
        default: 1,
        min: 0.1,
        max: 2,
        step: 0.1
      }
    }
  },
  geom: {
    name: 'Geometric',
    label: 'Geom',
    type: 'discrete',
    pdf: 'P(X = k) = (1 - p)^{k-1} p',
    cdf: 'P(X \\leq k) = 1 - (1 - p)^k',
    params: {
      p: {
        label: 'p',
        default: 0.2,
        min: 0.01,
        max: 0.99,
        step: 0.01
      }
    }
  },
  bernoulli: {
    name: 'Bernoulli',
    label: 'Bernoulli',
    type: 'discrete',
    pdf: 'P(X = k) = p^k (1 - p)^{1-k}',
    cdf: 'P(X \\leq k) = 1 - (1 - p)^k',
    params: {
      p: {
        label: 'p',
        default: 0.5,
        min: 0,
        max: 1,
        step: 0.1
      }
    }
  },
  nbinom: {
    name: 'Negative Binomial',
    label: 'NB',
    type: 'discrete',
    pdf: 'P(X = k) = \\binom{k+n-1}{n-1} p^n (1-p)^k',
    cdf: 'P(X \\leq k) = I_{1-p}(n, k+1)',
    params: {
      n: {
        label: 'n',
        default: 2,
        min: 1,
        max: 10,
        step: 1
      },
      p: {
        label: 'p',
        default: 0.3,
        min: 0.01,
        max: 0.99,
        step: 0.01
      }
    }
  },
  rayleigh: {
    name: 'Rayleigh',
    label: 'Rayleigh',
    type: 'continuous',
    pdf: 'f(x) = \\frac{x}{\\sigma^2} e^{-x^2/(2\\sigma^2)}',
    cdf: 'F(x) = 1 - e^{-x^2/(2\\sigma^2)}',
    params: {
      scale: {
        label: '\\sigma',
        default: 1,
        min: 0.1,
        max: 5,
        step: 0.1
      }
    }
  },
  pareto: {
    name: 'Pareto',
    label: 'Pareto',
    type: 'continuous',
    pdf: 'f(x) = \\frac{\\alpha x_m^\\alpha}{x^{\\alpha+1}}',
    cdf: 'F(x) = 1 - \\left(\\frac{x_m}{x}\\right)^\\alpha',
    params: {
      b: {
        label: '\\alpha',
        default: 2,
        min: 1,
        max: 5,
        step: 0.5
      },
      scale: {
        label: 'x_m',
        default: 3,
        min: 0.1,
        max: 5,
        step: 0.1
      }
    }
  },
  weibull_min: {
    name: 'Weibull',
    label: 'Weibull',
    type: 'continuous',
    pdf: 'f(x) = \\frac{k}{\\lambda}\\left(\\frac{x}{\\lambda}\\right)^{k-1} e^{-(x/\\lambda)^k}',
    cdf: 'F(x) = 1 - e^{-(x/\\lambda)^k}',
    params: {
      c: {
        label: 'k',
        default: 2,
        min: 1,
        max: 5,
        step: 0.5
      },
      scale: {
        label: '\\lambda',
        default: 1,
        min: 0.1,
        max: 5,
        step: 0.1
      }
    }
  },
  cauchy: {
    name: 'Cauchy',
    label: 'Cauchy',
    type: 'continuous',
    pdf: 'f(x) = \\frac{1}{\\pi\\gamma(1 + \\left(\\frac{x - x_0}{\\gamma}\\right)^2)}',
    cdf: 'F(x) = \\frac{1}{2} + \\frac{1}{\\pi}\\arctan\\left(\\frac{x - x_0}{\\gamma}\\right)',
    params: {
      loc: {
        label: 'x_0',
        default: 0,
        min: -5,
        max: 5,
        step: 1
      },
      scale: {
        label: '\\gamma',
        default: 1,
        min: 0.1,
        max: 5,
        step: 0.1
      }
    }
  },
  logistic: {
    name: 'Logistic',
    label: 'Logistic',
    type: 'continuous',
    pdf: 'f(x) = \\frac{e^{-(x-\\mu)/s}}{s(1 + e^{-(x-\\mu)/s})^2}',
    cdf: 'F(x) = \\frac{1}{1 + e^{-(x-\\mu)/s}}',
    params: {
      loc: {
        label: '\\mu',
        default: 0,
        min: -5,
        max: 5,
        step: 1
      },
      scale: {
        label: 's',
        default: 1,
        min: 0.1,
        max: 5,
        step: 0.1
      }
    }
  },
  lognorm: {
    name: 'Log-Normal',
    label: 'LogNormal',
    type: 'continuous',
    pdf: 'f(x) = \\frac{1}{x\\sigma\\sqrt{2\\pi}}e^{-\\frac{(\\ln(x) - \\mu)^2}{2\\sigma^2}}',
    cdf: 'F(x) = \\frac{1}{2} + \\frac{1}{2}\\text{erf}\\left(\\frac{\\ln(x) - \\mu}{\\sigma\\sqrt{2}}\\right)',
    params: {
      loc: {
        label: '\\mu',
        default: 0,
        min: -5,
        max: 5,
        step: 1
      },
      s: {
        label: '\\sigma',
        default: 1,
        min: 0.1,
        max: 2,
        step: 0.1
      }
    }
  }
}


export default distriConfig