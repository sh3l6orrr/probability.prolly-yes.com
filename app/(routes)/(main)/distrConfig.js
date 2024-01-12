const distriConfig = {
  norm: {
    name: 'Normal',
    label: '\\mathcal{N}',
    type: 'continuous',
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
    params: {
      df: {
        label: '\\nu',
        default: 10,
        min: 1,
        max: 30,
        step: 1
      }
    },
    sympy: {
      name: 'StudentT',
      params: {
        df: 'nu'
      }
    }
  },
  binom: {
    name: 'Binomial',
    label: 'B',
    type: 'discrete',
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
    },
    sympy: {
      name: 'Binomial',
      params: {
        n: 'n',
        p: 'p'
      }
    }
  },
  poisson: {
    name: 'Poisson',
    label: 'Pois',
    type: 'discrete',
    params: {
      mu: {
        label: '\\mu',
        default: 3,
        min: 1,
        max: 10,
        step: 1
      }
    },
    sympy: {
      name: 'Poisson',
      params: {
        mu: 'lamda'
      }
    }
  },
  expon: {
    name: 'Exponential',
    label: 'Exp',
    type: 'continuous',
    params: {
      rate: {
        label: '\\lambda',
        default: 0.5,
        min: 0.1,
        max: 2,
        step: 0.1
      }
    },
    sympy: {
      name: 'Exponential',
      params: {
        rate: 'rate'
      }
    }
  },
  uniform: {
    name: 'Uniform',
    label: 'U',
    type: 'continuous',
    params: {
      left: {
        label: 'a',
        default: 0,
        min: -5,
        max: 5,
        step: 1
      },
      right: {
        label: 'b',
        default: 5,
        min: -5,
        max: 5,
        step: 1
      }
    },
    sympy: {
      name: 'Uniform',
      params: {
        left: 'left',
        right: 'right'
      }
    }
  },
  chi2: {
    name: 'Chi-Squared',
    label: '\\chi^2',
    type: 'continuous',
    params: {
      df: {
        label: 'k',
        default: 3,
        min: 1,
        max: 10,
        step: 1
      }
    },
    sympy: {
      name: 'ChiSquared',
      params: {
        df: 'k'
      }
    }
  },
  f: {
    name: 'F',
    label: 'F',
    type: 'continuous',
    params: {
      dfn: {
        label: 'd_1',
        default: 2,
        min: 1,
        max: 5,
        step: 1
      },
      dfd: {
        label: 'd_2',
        default: 5,
        min: 1,
        max: 5,
        step: 1
      }
    },
    sympy: {
      name: 'FDistribution',
      params: {
        dfn: 'd1',
        dfd: 'd2'
      }
    }
  },
  beta: {
    name: 'Beta',
    label: 'Beta',
    type: 'continuous',
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
    },
    sympy: {
      name: 'Beta',
      params: {
        a: 'alpha',
        b: 'beta'
      }
    }
  },
  gamma: {
    name: 'Gamma',
    label: '\\Gamma',
    type: 'continuous',
    params: {
      k: {
        label: 'k',
        default: 2,
        min: 1,
        max: 10,
        step: 1
      },
      theta: {
        label: '\\theta',
        default: 1,
        min: 0.1,
        max: 2,
        step: 0.1
      }
    },
    sympy: {
      name: 'Gamma',
      params: {
        k: 'k',
        theta: 'theta'
      }
    }
  },
  geom: {
    name: 'Geometric',
    label: 'Geom',
    type: 'discrete',
    params: {
      p: {
        label: 'p',
        default: 0.2,
        min: 0.01,
        max: 0.99,
        step: 0.01
      }
    },
    sympy: {
      name: 'Geometric',
      params: {
        p: 'p'
      }
    }
  },
  bernoulli: {
    name: 'Bernoulli',
    label: 'Bernoulli',
    type: 'discrete',
    params: {
      p: {
        label: 'p',
        default: 0.5,
        min: 0,
        max: 1,
        step: 0.1
      }
    },
    sympy: {
      name: 'Bernoulli',
      params: {
        p: 'p'
      }
    }
  },
  nbinom: {
    name: 'Negative Binomial',
    label: 'NB',
    type: 'discrete',
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
    },
    sympy: {
      name: 'NegativeBinomial',
      params: {
        n: 'r',
        p: 'p'
      }
    }
  },
  rayleigh: {
    name: 'Rayleigh',
    label: 'Rayleigh',
    type: 'continuous',
    params: {
      scale: {
        label: '\\sigma',
        default: 1,
        min: 0.1,
        max: 5,
        step: 0.1
      }
    },
    sympy: {
      name: 'Rayleigh',
      params: {
        scale: 'sigma'
      }
    }
  },
  pareto: {
    name: 'Pareto',
    label: 'Pareto',
    type: 'continuous',
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
    },
    sympy: {
      name: "Pareto",
      params: {
        b: 'alpha',
        scale: 'xm'
      }
    }
  },
  cauchy: {
    name: 'Cauchy',
    label: 'Cauchy',
    type: 'continuous',
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
    },
    sympy: {
      name: 'Cauchy',
      params: {
        loc: 'x0',
        scale: 'gamma'
      }
    }
  },
  logistic: {
    name: 'Logistic',
    label: 'Logistic',
    type: 'continuous',
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
    },
    sympy: {
      name: 'Logistic',
      params: {
        loc: 'mu',
        scale: 's'
      }
    }
  },
  lognorm: {
    name: 'Log-Normal',
    label: 'LogNormal',
    type: 'continuous',
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
    },
    sympy: {
      name: 'LogNormal',
      params: {
        loc: 'mean',
        s: 'std'
      }
    }
  }
}


export default distriConfig