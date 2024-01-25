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

      <p>In probability theory, we define a concept called &quot;random variable&quot;, usually denoted by a capital, say <InlineMath math='X' />.  <InlineMath math='X' /> is a random quantity that takes a different value each time it is evaluated. The probability that <InlineMath math='X' /> takes a specific value <InlineMath math='x' /> is given by a function <InlineMath math='f' />. In general, there are two cases:
        <ul className="list-disc my-3 ml-4">
          <li>
            If <InlineMath math='f' /> is continuous, it is called the probability density function (PDF), defined by <InlineMath math='f(x) = P(X = x)' />, satisfying <InlineMath math='\int_{x\in S} f(x) dx = 1' />, and <InlineMath math='X' /> is called a continuous random variable.
          </li>
          <li>
            If <InlineMath math='f' /> takes discrete values, it is called the probability mass function (PMF), defined by <InlineMath math='f(k) = P(X = k)' />, satisfying <InlineMath math='\sum_{x\in S} f(k)= 1' />, and <InlineMath math='X' /> is called a discrete random variable.
          </li>
        </ul> where <InlineMath math='S' /> is the domain of the function, or &quot;support&quot; of the random variable. The PDF or PMF uniquely identifies a random variable.
        <div className="h-12" />

        <h2>What are probability distributions?</h2>
        <div className="h-6" />

        A random variable is said to follow a certain probability distribution if its PDF or PMF is in a specific form. For example, continuous ramdom variables with PDFs in the form of <InlineMath math='f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}(\frac{x - \mu}{\sigma})}' /> are said to have a normal distribution of <InlineMath math='\mathcal{N}(\mu, \sigma)' />. Discrete ramdom varibales with a PMF in the form of <InlineMath math='f(k) = p^k(1-p)^{n-k} \binom{n}{k}' /> are said to have a binomial distribution of <InlineMath math='B(n, k)' />. Both the normal distribution and the binomial distribution are probability distributions. Other popular probability distributions include chi-squared distribution, poisson distribution, weibull distribution, etc. Their importance is embodied many fields of science (even outside of maths or statistics), including physics, biology, sociology, and so on.
      </p>
      <div className="h-12" />
      <h2>What does this calculator do?</h2>
      <div className="h-6" />
      <p>
        This online calculator allows you to perform calculations on probability distributions. To start, choose from a wide range of commonly used probability distributions, including continuous or discrete ones, and toggle the parameters. After that, you can select the utilites of interest to help you understand more about the distribution. The description of all the utilites is given below.
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
