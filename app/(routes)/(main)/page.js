export const metadata = {
  title: "Online Probability Distribution Calculator",
  description: "Probability Distribution Calculator from ProllyYes",
}

import Stage from "./Stage"
import Settings from "./Settings"
import { InlineMath } from "react-katex"
export default function Home() {
  return <div>
    <div className="md:flex border-b">
      <div className="bg-white dark:bg-black flex flex-col
    w-screen fixed md:sticky md:w-96 md:border-r md:overflow-scroll md:top-0 z-30 md:h-screen shrink-0">
        <div className="h-12" />
        <Settings />
      </div>
      <div className="px-8 py-4 flex flex-col grow min-h-screen ">
        <div className="md:h-12 h-44" />
        <Stage />
        <div className="h-8" />
      </div>
    </div>

    <main className="md:p-12 p-8">
      <h1>Probability Distribution Calculator</h1>
      <div className="h-12" />

      <h2>What are random variables?</h2>
      <div className="h-6" />

      <p>Informally, random variables takes a random quantity each time it is evaluated. It is usually denoted by a capital, say <InlineMath math='X' />. The probability that <InlineMath math='X' /> takes a specific value <InlineMath math='x' /> is given by a function <InlineMath math='f' />. In other words, <InlineMath math='f(x) = P(X = x)' />. Depending on the range of <InlineMath math='X' />, there are two cases:
        <ul className="list-disc my-3 ml-4">
          <li>
            If the range is countable: <InlineMath math='f(x)' /> is called the probability density function (PDF). It satisfies <InlineMath math='\int_{x\in R_X} f(x) dx = 1' />. <InlineMath math='X' /> is called a continuous random variable.
          </li>
          <li>
            If the range is uncountable: <InlineMath math='f(k)' /> is called the probability mass function (PMF). It satisfies <InlineMath math='\sum_{x\in R_X} f(k)= 1' />. <InlineMath math='X' /> is called a discrete random variable.
          </li>
        </ul> The <InlineMath math='R_X' /> in the formulas above is the range or &quot;support&quot; of <InlineMath math='X' />. The PDF or PMF uniquely identifies a random variable. Note that the formal definition of random variables in probability theory is a little more complex and involves measure theory.
      </p>
      <div className="h-12" />

      <h2>What are probability distributions?</h2>
      <div className="h-6" />
      <p>
        A random variable is said to follow a certain probability distribution if its PDF or PMF is in a specific form. For example:
        <ul className="list-disc my-3 ml-4">
          <li>
            <InlineMath math='f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}(\frac{x - \mu}{\sigma})}' /> identifies a normal distribution of <InlineMath math='\mathcal{N}(\mu, \sigma)' />. It is a continuous random variable.
          </li>
          <li>
            <InlineMath math='f(k) = p^k(1-p)^{n-k} \binom{n}{k}' /> identifies a binomial distribution of <InlineMath math='B(n, k)' />. It is a discrete random variable.
          </li>
        </ul>
        Both the normal distribution and the binomial distribution are probability distributions. Other popular probability distributions include chi-squared distribution, poisson distribution, weibull distribution, etc. Probability distributions are foundational to probability theory and statistics. Their importance is also embodied many fields of science including physics, biology, sociology, etc.
      </p>
      <div className="h-12" />

      <h2>What attributes do probability distributions have?</h2>
      <div className="h-6" />
      Let&apos;s say <InlineMath math='X' /> follows some probability distribution. Below are some common attributes of <InlineMath math='X' />.
      <p>
        <ul className="list-disc my-3 ml-4">
        <li>
            Support <InlineMath math='R_X' />: The set of possible values of <InlineMath math='X' />.
          </li>
          <li>
            Expected value <InlineMath math='E(X)' />: The average of <InlineMath math='X' />.
          </li>
          <li>
            Variance <InlineMath math='Var(X)' />: It tells you how much does <InlineMath math='X' /> vary.
          </li>
          <li>
            Skewness <InlineMath math='Skew(X)' />: It tells you how skewed is the distribution of <InlineMath math='X' />.
          </li>
          <li>
            Exterior kurtosis <InlineMath math='Kurt(X)' />: A measure of the tailedness of the distribution of <InlineMath math='X' />.
          </li>
          <li>
            PDF / PMF: Gives the probability that <InlineMath math='X' /> takes a specific value.
          </li>
          <li>
            CDF: Gives the probability that <InlineMath math='X' /> is less than a specific value.
          </li>
        </ul>
      </p>
      <div className="h-12" />

      <h2>What does this calculator do?</h2>
      <div className="h-6" />
      <p>
        This online calculator allows you to perform calculations on probability distributions. To start, choose from a wide range of commonly used probability distributions. Then, you can choose to toggle the parameters. After that, you can select the utilites of interest to help you understand more about the distribution. The description of all the utilites is given below.
        <ul className="list-disc my-3 ml-4">
          <li>
            Meta: Provides general information of the probability distribution without looking at the parameters.
          </li>
          <li>
            Attributes: Calculates the numerical values of moments of the distribution, including mean, variance, skewness and exterior kurtosis.</li>
          <li>
            PDF: Shows the probability density function <InlineMath math='f(x)' /> formula and plot, and allows you to evaluate the function at specific points.
          </li>
          <li>
            CDF: Gives you formula and plot for the cumulative distribution function <InlineMath math='F(x)' />. It allows you to evaulate the function along with its inverse <InlineMath math='F^{-1}(x)' />.
          </li>
          <li>
            Sampling: Allows you to easily sample from the distribution and generate histograms of the sample.
          </li>
        </ul>
      </p>
    </main>

  </div>
}
