import Header from "./Header";
import ListView from "./list-view";
import AddBlog from "./add-blog";
import React, { useState } from "react";

function Blog() {
  const defaultBlogs = [
    {
      title: "Tesla's stock price falls after bitcoin backtrack",
      description:
        "Tesla Inc's shares fell 2.2% on Monday after CEO Elon Musk tweeted that the company will no longer accept bitcoin as payment for its electric vehicles.",
    },
    {
      title: "WHO classifies India variant as concerning",
      description:
        'The World Health Organization has classified the Covid-19 variant first found in India as a "variant of concern" for global health, saying preliminary studies showed it spreads more easily than other variants and may be more resistant to vaccines.',
    },
    {
      title: "Gas shortage leads to panic buying in Southeast US",
      description:
        "A cyberattack on a pipeline operator has led to a gas shortage in the southeastern United States, causing panic buying and long lines at gas stations.",
    },
    {
      title: "Facebook Oversight Board upholds Trump ban",
      description:
        "Facebook Inc's independent Oversight Board has upheld the social media platform’s decision to suspend former U.S. President Donald Trump’s Facebook and Instagram accounts after the January 6th Capitol riot, but criticized the indefinite nature of the suspension.",
    },
    {
      title: "SpaceX launches and lands Starship prototype",
      description:
        "SpaceX has successfully launched and landed a Starship prototype, marking a significant milestone in the company’s quest to develop a reusable rocket for interplanetary travel.",
    },
    {
      title: "Amazon buys MGM for $8.45 billion",
      description:
        "Amazon.com Inc has agreed to buy movie studio Metro-Goldwyn-Mayer (MGM) for $8.45 billion, marking the tech giant’s biggest acquisition in the entertainment industry to date.",
    },
    {
      title: "Colonial Pipeline CEO defends paying ransom",
      description:
        "The CEO of Colonial Pipeline has defended his decision to pay a $4.4 million ransom to the hackers who attacked the company’s computer systems, saying he believed it was the right thing to do to ensure the pipeline could be restored quickly and prevent fuel shortages.",
    },
    {
      title: "Israel and Hamas agree to ceasefire",
      description:
        "After 11 days of intense fighting, Israel and Hamas have agreed to a ceasefire, bringing an end to the deadliest violence in years between the two sides.",
    },
    {
      title: "Elon Musk hosts Saturday Night Live",
      description:
        "Elon Musk, CEO of Tesla and SpaceX, hosted Saturday Night Live, marking a departure from the show’s traditional celebrity hosts and causing controversy among some cast members and fans.",
    },
    {
      title: "CDC relaxes mask guidelines for fully vaccinated people",
      description:
        "The U.S. Centers for Disease Control and Prevention (CDC) has relaxed its guidelines on mask-wearing for fully vaccinated people, saying they can now safely engage in most indoor and outdoor activities without wearing a mask.",
    },
    {
      title: "Cheney ousted from House Republican leadership",
      description:
        "Rep. Liz Cheney, a vocal critic of former President Donald Trump, has been ousted from her role as House Republican Conference Chair, signaling the continued dominance of Trump within the party.",
    },
    {
      title: "Bill and Melinda Gates announce divorce",
      description:
        "Bill and Melinda Gates, one of the world’s wealthiest and most influential couples, have announced their divorce after 27 years of marriage, raising questions about the future of their philanthropic foundation.",
    },
  ];
  const [blogs, setBlogs] = useState(defaultBlogs);

  const handleAddBlog = (blog) => {
    setBlogs([...blogs, blog]);
  };

  return (
    <>
      <Header blogCount={blogs.length} />
      <ListView blogs={blogs} />
      <div className="border-bottom my-3"></div>
      <AddBlog addBlog={handleAddBlog} />
    </>
  );
}

export default Blog;
