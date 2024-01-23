export const metadata = {
  title: "Online Probability Distribution Calculator",
  description: "Probability Distribution Calculator from ProllyYes",
}

import Stage from "./Stage"
import Settings from "./Settings"
import { InlineMath } from "react-katex"
export default function Home() {
  return <>
    <div className="bg-white dark:bg-black flex flex-col
    w-screen fixed md:w-96 md:h-screen md:border-r md:overflow-scroll md:top-0 z-30">
      <div className="h-12" />
      <Settings />
    </div>
    <div className="px-8 py-4 md:ml-96 flex flex-col">
      <div className="flex flex-col gap-4 min-h-screen">
        <div className="md:h-10 h-48" />
        <Stage />
      </div>
      <div className="h-8 md:hidden" />
      <hr />
      <main>
        <div className="h-8" />
        <h1>Probability Distribution Calculator</h1>
        <div className="h-12" />
        <h2>What are probability distributions?</h2>
        <div className="h-6" />
        <p>In probability theory, we define a concept called &quot;random variable&quot;, usually denoted by a capital, say <InlineMath math='X' />.  <InlineMath math='X' /> is a random quantity that takes a different value each time it is evaluated. Assume <InlineMath math='X' /> is continuous, the probability that <InlineMath math='X' /> takes a specific value is given by the probability density function (PDF), denoted by  <InlineMath math='f(x)' />. Then, the probability that <InlineMath math='X' /> takes the value  <InlineMath math='x' /> is given by <InlineMath math='f(x)' />. In other words, <InlineMath math='f(x) = P(X = x)' />. The PDF can take any form, as long as the integral across the its domain is 1, that is <InlineMath math='\int f(x) dx = 1' />. The PDF uniquely identifies a random variable.
        <div className="h-3" />

        However, there are some PDFs that arises frequently in science, either naturally or artificially. The most famous one is probably <InlineMath math='f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}(\frac{x - \mu}{\sigma})}' />. Any random variable with a PDF of this form is said to have a normal distribution of <InlineMath math='\mathcal{N}(\mu, \sigma)' />. Other popular probability distributions include poisson distribution, weibull distribution, etc. Their importance is embodied many fields of science (even outside of maths or statistics), including physics, biology, sociology, and so on.
        </p>
        <div className="h-12" />
        <h2>What can this calculator do?</h2>
        <div className="h-6" />
        <p>
          This online calculator allows you to perform calculations on probability with several steps. First, configuring: choose from a wide range of commonly used probability distributions, including continuous or discrete ones, and toggle the parameters. After that, you can select the utilites of interest to help you understand more about the distribution. By default, &quot;attributes&quot; and &quot;PDF&quot; are shown. &quot;Attributes&quot; calculates the numerical values of moments of the distribution, including mean, variance, skewness and exterior kurtosis. &quot;PDF&quot; shows the probability density function <InlineMath math='f(x)' /> formula and plot, and allows you to evaluate the function at specific points. Other utilites are also useful.  &quot;Meta&quot; gives you general information of the probability distribution without looking at the parameters. &quot;CDF&quot; gives you formula and plot for the cumulative distribution function <InlineMath math='F(x)' />. It allows you to evaulate the function along with its inverse <InlineMath math='F^{-1}(x)' />. &quot;Sampling&quot; allows you to easily sample from the distribution and generate histograms of the sample.
        </p>
        <div className="h-12" />
        <footer>ProllyYes @ 2024 <div className="w-2 inline-block" />
          <span className="text-sm dark:text-gray-400 text-gray-600 inline">
            An online tool for calculation and visualization of probability distributions.
          </span>
        </footer>
      </main>
    </div>


  </>
}
