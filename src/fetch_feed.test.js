import { rest } from "msw";
import { setupServer } from "msw/node";
import * as github from "@actions/github";

// Pull in utils to enable the fetching of RSS feeds and parsing of XML.
import utils from "./utils.js";
const github_token = "1234567890";

github.context.repo.owner = "chrisreddington";
github.context.repo.repo = "rss-parser";

const server = setupServer(
  rest.get(
    "https://github.blog/feed",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.xml(
          `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
          xmlns:content="http://purl.org/rss/1.0/modules/content/"
          xmlns:wfw="http://wellformedweb.org/CommentAPI/"
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:atom="http://www.w3.org/2005/Atom"
          xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
          xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
          
          xmlns:georss="http://www.georss.org/georss"
          xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
          >
        
        <channel>
          <title>The GitHub Blog</title>
          <atom:link href="https://github.blog/feed/" rel="self" type="application/rss+xml" />
          <link>https://github.blog/</link>
          <description>Updates, ideas, and inspiration from GitHub to help developers build and design software.</description>
          <lastBuildDate>Wed, 21 Dec 2022 16:06:49 +0000</lastBuildDate>
          <language>en-US</language>
          <sy:updatePeriod>
          hourly	</sy:updatePeriod>
          <sy:updateFrequency>
          1	</sy:updateFrequency>
          <generator>https://wordpress.org/?v=6.1.1</generator>
        
        <image>
          <url>https://github.blog/wp-content/uploads/2019/01/cropped-github-favicon-512.png?fit=32%2C32</url>
          <title>The GitHub Blog</title>
          <link>https://github.blog/</link>
          <width>32</width>
          <height>32</height>
        </image> 
        <site xmlns="com-wordpress:feed-additions:1">153214340</site>	<item>
            <title>What&#8217;s with all the ducks?</title>
            <link>https://github.blog/2022-12-23-whats-with-all-the-ducks/</link>
            
            <dc:creator><![CDATA[Michelle Mannering]]></dc:creator>
            <pubDate>Fri, 23 Dec 2022 17:00:11 +0000</pubDate>
                <category><![CDATA[Company]]></category>
            <category><![CDATA[Engineering]]></category>
            <category><![CDATA[GitHub Universe]]></category>
            <category><![CDATA[What is GitHub?]]></category>
            <guid isPermaLink="false">https://github.blog/?p=69198</guid>
        
                  <description><![CDATA[What in the world do rubber ducks have to do with programming? And why were they everywhere at GitHub Universe? A lot of you asked, so I’m here to help explain. ]]></description>
                            <content:encoded><![CDATA[<p>Black eyes.<br />
        Orange beak.<br />
        Large yellow body.<br />
        Rubbery texture…<br />
        …often seen floating in baths.</p>
        <p>What are we talking about? Rubber ducks, of course. Now the question you might be asking, &#8220;Why is everyone obsessed with rubber ducks?&#8221; You may have seen our <a href="https://www.youtube.com/watch?v=pBy1zgt0XPc">new “What is GitHub?” video</a> making its way around the internet. Outside of the famous comedian, whom you may recognize, you saw a new character floating around (literally). And if you were at GitHub Universe this year or tuned into the livestream, you probably saw lots of physical rubber ducks dispersed throughout.</p>
        <p>So, what in the world do rubber ducks have to do with programming? And why were they everywhere? A lot of you asked, so I’m here to help explain.</p>
        <h2 id="rubber-ducks-programming-%f0%9f%a6%86">Rubber ducks + programming <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f986.png" alt="🦆" class="wp-smiley" style="height: 1em; max-height: 1em;" /><a href="#rubber-ducks-programming-%f0%9f%a6%86" class="heading-link pl-2 text-italic text-bold" aria-label="Rubber ducks + programming &#x1f986;"></a></h2>
        <p>Our story starts back in 1999, when a book was released, <em><a href="https://en.wikipedia.org/wiki/The_Pragmatic_Programmer">The Pragmatic Programmer</a></em> by Andrew Hunt. The story describes a computer programmer who sat a rubber duck down one fine day, and explained his code to the duck—line by line!</p>
        <p>The process of speaking the code out loud helped the developer understand the code and gain greater insight into his work. After all, rubber ducks don’t talk back!</p>
        <p>The technique stuck. It’s now called rubber duck debugging or rubberducking. Of course, it doesn’t need to be only rubber ducks, but the term stuck and is part of developer lingo. So, in our effort to explain all the things GitHub can do for developers and businesses, we used this same technique, with our own special rubber duck. Our duck takes a journey through all the elements of GitHub that make it the most complete developer platform to build, scale, and deliver secure software.</p>
        <blockquote class="twitter-tweet tw-align-center">
        <p dir="ltr" lang="en">If anyone missed the significance of rubber ducks, <a href="https://twitter.com/film_girl?ref_src=twsrc%5Etfw">@film_girl</a> and <a href="https://twitter.com/anjuan?ref_src=twsrc%5Etfw">@anjuan</a> explained it during the live stream at <a href="https://twitter.com/hashtag/GitHubUniverse?src=hash&amp;ref_src=twsrc%5Etfw">#GitHubUniverse</a> <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f986.png" alt="🦆" class="wp-smiley" style="height: 1em; max-height: 1em;" /></p>
        <p>Sound (or subs) on! <a href="https://t.co/p7G3eZwqBc">pic.twitter.com/p7G3eZwqBc</a></p>
        <p>— Mish <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/2728.png" alt="✨" class="wp-smiley" style="height: 1em; max-height: 1em;" /> <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f369.png" alt="🍩" class="wp-smiley" style="height: 1em; max-height: 1em;" /> Michelle Mannering (@MishManners) <a href="https://twitter.com/MishManners/status/1590859646075830273?ref_src=twsrc%5Etfw">November 11, 2022</a></p></blockquote>
        <p><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p>
        <h2 id="your-turn-%f0%9f%94%ae">Your turn <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f52e.png" alt="🔮" class="wp-smiley" style="height: 1em; max-height: 1em;" /><a href="#your-turn-%f0%9f%94%ae" class="heading-link pl-2 text-italic text-bold" aria-label="Your turn &#x1f52e;"></a></h2>
        <p>If rubber duck debugging is new to you, try it out! It doesn’t just work with code, either. If you’re ever stuck, try talking through your problem or challenge out loud, whether it’s to that plant on your desk, a roommate, your family, or even your dog. In the meantime, your code on GitHub is waiting to be explained to your new yellow friend.</p>
        <div style="width: 1920px;" class="wp-video"><!--[if lt IE 9]><script>document.createElement('video');</script><![endif]-->
        <video class="wp-video-shortcode" id="video-69198-1" width="1920" height="1080" preload="metadata" controls="controls"><source type="video/mp4" src="https://github.blog/wp-content/uploads/2022/12/WhatisGitHub_Cutdown_Duck_14_16x9.mp4?_=1" /><a href="https://github.blog/wp-content/uploads/2022/12/WhatisGitHub_Cutdown_Duck_14_16x9.mp4">https://github.blog/wp-content/uploads/2022/12/WhatisGitHub_Cutdown_Duck_14_16x9.mp4</a></video></div>
        ]]></content:encoded>
                  
            
            
            <post-id xmlns="com-wordpress:feed-additions:1">69198</post-id>	</item>
            <item>
            <title>GitHub Gives 2022: Creating positive, lasting contributions in our communities</title>
            <link>https://github.blog/2022-12-21-github-gives-2022-creating-positive-lasting-contributions-in-our-communities/</link>
            
            <dc:creator><![CDATA[Toya East]]></dc:creator>
            <pubDate>Wed, 21 Dec 2022 16:06:49 +0000</pubDate>
                <category><![CDATA[Community]]></category>
            <category><![CDATA[Company]]></category>
            <category><![CDATA[social impact]]></category>
            <guid isPermaLink="false">https://github.blog/?p=69259</guid>
        
                  <description><![CDATA[This year, we took GitHub Gives, our company-wide giving campaign, to new heights and wanted to share our learnings to provide best practices in programming a successful hybrid giving campaign for employees.]]></description>
                            <content:encoded><![CDATA[<p>The Social Impact team at GitHub works to empower developers, nonprofits, and the greater social sector to drive positive and lasting contributions to the world with GitHub products, our brand, and our employees. Each year, we host GitHub Gives, a month-long campaign to inspire employees to give back to their communities to help drive this positive and lasting change. This year, we took GitHub Gives to new heights and wanted to share our learnings to provide best practices in programming a successful hybrid‐giving campaign for employees.</p>
        <h2 id="designing-a-month-of-giving-for-employees">Designing a month of giving for employees<a href="#designing-a-month-of-giving-for-employees" class="heading-link pl-2 text-italic text-bold" aria-label="Designing a month of giving for employees"></a></h2>
        <p>GitHub Gives traditionally has been an end-of-year campaign in December; this year, we moved the month of giving to October. Why? We typically have high engagement in the first two weeks of December; however, the last two weeks of the month are challenging as many employees are out of the office. So, looking to have four full weeks of programming and opportunities for employees to engage, we chose October (this year) to host the campaign.</p>
        <p>In the spirit of friendly competition, we introduced thematic fundraising raffles and a participation award. Employees were encouraged to participate in a light touch activity such as recycling or hiking in the outdoors, snap a photo, and donate to their favorite charity to be entered to win a prize. Watching these photos light up Slack channels and issues ignited discussion and excitement for the respective themes.</p>
        <p>The first Social Impact Giving Award was also up for grabs for the GitHub team with the highest participation rate. Weekly progress reports were distributed to leadership to encourage donating and/or volunteering to claim the prize. We also offered updated metrics to <a href="https://socialimpact.github.com/insights/employee-champions-inspire-colleagues-to-give-back/">Employee Champions</a>, advocates of Social Impact programming, to ignite a grassroots approach to enlist colleagues to take part. Congratulations to GitHub Finance, the winners of the award!</p>
        <p>Our communications were streamlined, including cohesive campaign branding and messaging that began before our kickoff event on October 1. From in-office TV reminders to leadership shout-outs, branded Zoom backgrounds, and calendar reminders, we aimed to have several touch points for employees to remember to take part and activate their company match through our online giving tool. Instead of aligning to a numeric goal, we focused on impact-driven storytelling and precise directions on how to take part.</p>
        <figure id="attachment_69264"  class="wp-caption aligncenter mx-0"><img decoding="async" src="https://github.blog/wp-content/uploads/2022/12/Screen-Shot-2022-10-04-at-2.28.51-PM.png?w=876&#038;fit=1024%2C1024" alt="" class="width-fit size-large wp-image-69264 width-fit" srcset="https://github.blog/wp-content/uploads/2022/12/Screen-Shot-2022-10-04-at-2.28.51-PM.png?w=1050 1050w, https://github.blog/wp-content/uploads/2022/12/Screen-Shot-2022-10-04-at-2.28.51-PM.png?w=257 257w, https://github.blog/wp-content/uploads/2022/12/Screen-Shot-2022-10-04-at-2.28.51-PM.png?w=768 768w, https://github.blog/wp-content/uploads/2022/12/Screen-Shot-2022-10-04-at-2.28.51-PM.png?w=876&#038;fit=1024%2C1024 876w" sizes="(max-width: 876px) 100vw, 876px" data-recalc-dims="1" /><figcaption class="text-mono color-fg-muted mt-14px f5-mktg">Dawn Beatty, GitHub Chief Human Resources Officer, and Shelley McKinley, GitHub Chief Legal Officer, show off the GitHub Gives branded Zoom background during a virtual employee event.</figcaption></figure>
        <p>Overall, we grew our participation by 10% year over year! Moving the campaign from December to October allowed for an increase in programming and a longer period to spread messages on the importance of impact. In addition, a multi-faceted approach from leadership and Employee Champions guided employees to understand how we can make a collective difference.</p>
        <h2 id="partnering-with-nonprofit-organizations">Partnering with nonprofit organizations<a href="#partnering-with-nonprofit-organizations" class="heading-link pl-2 text-italic text-bold" aria-label="Partnering with nonprofit organizations"></a></h2>
        <p>To broaden the causes we support, we consulted employees, GitHub Communities of Belonging, and data from previous GitHub Gives to understand what types of nonprofits we should partner with. We found that educational causes and causes directly related to employees were among the top concerning support and general interest.</p>
        <figure id="attachment_69266"  class="wp-caption aligncenter mx-0"><img decoding="async" loading="lazy" src="https://github.blog/wp-content/uploads/2022/12/Screen-Shot-2022-10-13-at-10.21.11-AM.png?w=1024&#038;fit=1024%2C1024" alt="" class="width-fit size-large wp-image-69266 width-fit" srcset="https://github.blog/wp-content/uploads/2022/12/Screen-Shot-2022-10-13-at-10.21.11-AM.png?w=1097 1097w, https://github.blog/wp-content/uploads/2022/12/Screen-Shot-2022-10-13-at-10.21.11-AM.png?w=300 300w, https://github.blog/wp-content/uploads/2022/12/Screen-Shot-2022-10-13-at-10.21.11-AM.png?w=768 768w, https://github.blog/wp-content/uploads/2022/12/Screen-Shot-2022-10-13-at-10.21.11-AM.png?w=1024&#038;fit=1024%2C1024 1024w" sizes="(max-width: 1000px) 100vw, 1000px" data-recalc-dims="1" /><figcaption class="text-mono color-fg-muted mt-14px f5-mktg">An educator from Wildlife Encounters holds an armadillo up to the camera in this screenshot from a virtual event.</figcaption></figure>
        <p>Hosting a virtual kickoff event has traditionally been successful each year—a fun tradition you would want to attend! This year we were joined by <a href="https://www.seeingeye.org/">The Seeing Eye</a>, a nonprofit whose mission is to enhance the independence, dignity, and self-confidence of people who are blind through the use of specially trained Seeing Eye® dogs. We heard from Miranda Meade, Senior Associate, Donor Relations, who spoke about training a puppy to match the dog with a blind person while fundraising to name three special dogs—hello, Mona, Octo, and Hubot!</p>
        <figure class="gh-full-blockquote mx-0 pl-6 mt-6 mt-md-7 mb-7 mb-md-8"><blockquote><p>The whole GitHub team was incredible to work with–I am blown away by their generosity. Not only did GitHub offer incredible support towards the mission of The Seeing Eye®, but I had fun presenting virtually for their GitHub Gives campaign!</p></blockquote><figcaption class="text-mono color-fg-muted f5-mktg mt-3">- Miranda Meade, Senior Associate, Donor Relations, The Seeing Eye</figcaption></figure>
        <p>We hosted <a href="https://www.hackthehood.org/">Hack the Hood,</a> a Bay Area organization that provides youth and communities of color with tech skill-building programs and career navigation support that are grounded in justice and ensure economic mobility, at our San Francisco office for an in-person event. We ‘took over’ the weekly happy hour by including a presentation from the organization on how they’re making an impact in the community. Themed beverages and snacks were provided, as well as donation and volunteer reminders for employees to connect with this local nonprofit. Here’s what Terrence Riley, Executive Director of Hack the Hood, had to say about partnering with us:</p>
        <figure class="gh-full-blockquote mx-0 pl-6 mt-6 mt-md-7 mb-7 mb-md-8"><blockquote><p>As the new Executive Director of Hack the Hood it has been great to see how supported we are from partners like GitHub. By being a part of Github Gives and having the opportunity to share our work in front of the GitHub community, we are able to connect our learners and our work with the companies they aspire to work at and create. Together we are able to impact ourselves and our community.</p></blockquote><figcaption class="text-mono color-fg-muted f5-mktg mt-3">- Terrence Riley, Executive Director, Hack the Hood</figcaption></figure>
        <figure id="attachment_69265"  class="wp-caption aligncenter mx-0"><img decoding="async" loading="lazy" src="https://github.blog/wp-content/uploads/2022/12/IMG_3227.png?w=768&#038;fit=1024%2C1024" alt="A presenter stands in front of a screen that reads &quot;Hack the Hood&quot; on the stage in GitHub HQ in San Francisco." class="width-fit size-large wp-image-69265 width-fit" srcset="https://github.blog/wp-content/uploads/2022/12/IMG_3227.png?w=3024 3024w, https://github.blog/wp-content/uploads/2022/12/IMG_3227.png?w=225 225w, https://github.blog/wp-content/uploads/2022/12/IMG_3227.png?w=768&#038;fit=1024%2C1024 768w, https://github.blog/wp-content/uploads/2022/12/IMG_3227.png?w=1152 1152w, https://github.blog/wp-content/uploads/2022/12/IMG_3227.png?w=1536 1536w, https://github.blog/wp-content/uploads/2022/12/IMG_3227.png?w=2000 2000w" sizes="(max-width: 768px) 100vw, 768px" data-recalc-dims="1" /><figcaption class="text-mono color-fg-muted mt-14px f5-mktg">The executive director of Hack the Hood presents during a happy hour at GitHub HQ in San Francisco.</figcaption></figure>
        <h2 id="whats-next">What’s next<a href="#whats-next" class="heading-link pl-2 text-italic text-bold" aria-label="What’s next"></a></h2>
        <p>We’re looking forward to taking our learnings from GitHub Gives and applying them to our upcoming Volunteer Month in April 2023. We strive to make the most significant impact we can as a company, and with even more employees involved, the more reach we can have to make a difference to those who need it most.</p>
        ]]></content:encoded>
                  
            
            
            <post-id xmlns="com-wordpress:feed-additions:1">69259</post-id>	</item>
            <item>
            <title>Increase developer productivity, save time on developer onboarding, and drive ROI in 2023</title>
            <link>https://github.blog/2022-12-20-increase-developer-productivity-save-time-on-developer-onboarding-and-drive-roi-in-2023/</link>
            
            <dc:creator><![CDATA[Jeimy Ruiz]]></dc:creator>
            <pubDate>Tue, 20 Dec 2022 18:00:26 +0000</pubDate>
                <category><![CDATA[Enterprise]]></category>
            <category><![CDATA[Codespaces]]></category>
            <category><![CDATA[GitHub Actions]]></category>
            <category><![CDATA[GitHub Advanced Security]]></category>
            <category><![CDATA[GitHub Copilot]]></category>
            <category><![CDATA[GitHub Enterprise]]></category>
            <category><![CDATA[GitHub Enterprise Cloud]]></category>
            <guid isPermaLink="false">https://github.blog/?p=69237</guid>
        
                  <description><![CDATA[Forrester's Total Economic Impact™ study dives into how GitHub Enterprise Cloud and GitHub Advanced Security help businesses drive ROI, increase developer productivity, and save time on developer onboarding.]]></description>
                            <content:encoded><![CDATA[<p>What if you could remove days from your onboarding process and have developers up and running in minutes? Or save developers hours per week with more automation? How much work could your developers get done if they spent less time switching between different tools and tasks? And what if reducing the amount of tools also reduced your operational costs?</p>
        <p>These are common struggles developer teams face and were some of the challenges Canadian communications and IT provider <a href="https://github.com/customer-stories/telus">TELUS</a> experienced with their fragmented tech stack and engineering teams. They constantly had to define, maintain, and provision development environments, making it so that developers spent too much time context switching between different tools and not enough time writing code. But when they decided to use GitHub Enterprise as their one, centralized and integrated platform for end to end software development, magic happened:</p>
        <ul>
        <li>Onboarding <strong>happens in minutes</strong> now for new developers</li>
        <li><strong>Two hours of time saved</strong> per developer each week</li>
        <li><strong>One minute of time saved</strong> per GitHub Actions executed</li>
        </ul>
        <p>We hear these stories from <a href="https://github.com/customer-stories/enterprise">GitHub customers</a> all the time. And to dig further into just how much GitHub impacts developers and businesses, we commissioned a <a href="https://resources.github.com/forrester/?utm_source=&#038;utm_medium=&#038;utm_campaign=2020q3-site-ww-ForresterReport&#038;utm_content=Blog">Total Economic Impact<img src="https://s.w.org/images/core/emoji/14.0.0/72x72/2122.png" alt="™" class="wp-smiley" style="height: 1em; max-height: 1em;" /></a> (TEI) study from Forrester Consulting to examine the potential return on investment (ROI) businesses can gain by using GitHub Enterprise Cloud (GHEC) and GitHub Advanced Security (GHAS).</p>
        <p>To understand the benefits, costs, and risks associated with investing in GitHub’s platform, they interviewed and surveyed individuals with experience using GHEC and GHAS, and aggregated these experiences into a composite organization<sup id="fnref-69237-1"><a href="#fn-69237-1" class="jetpack-footnote" title="Read footnote.">1</a></sup>.</p>
        <p>So, what did Forrester find? <strong>Over three years, using GitHub drove 433% ROI for the organization simply with the combined power of all GitHub&#8217;s enterprise products.</strong></p>
        <p>Let’s take a look at other ways GitHub helps developers be more productive, onboard faster, and remediate security vulnerabilities all while increasing efficiency.</p>
        <h2 id="better-code-faster-%e2%9a%a1">Better code, faster <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/26a1.png" alt="⚡" class="wp-smiley" style="height: 1em; max-height: 1em;" /><a href="#better-code-faster-%e2%9a%a1" class="heading-link pl-2 text-italic text-bold" aria-label="Better code, faster &#x26a1;"></a></h2>
        <p>Developer productivity is an important metric that’s incredibly difficult to quantify and define. Is it influenced by developer happiness? Is it defined by how much time a developer spends writing code? Or, is it the speed at which developers complete tasks?</p>
        <p>With more and more businesses grappling with increasingly complicated tech stacks, we know that simplifying the tools developers use on a daily basis positively impacts developer productivity.</p>
        <h3 id="key-challenges">Key challenges<a href="#key-challenges" class="heading-link pl-2 text-italic text-bold" aria-label="Key challenges"></a></h3>
        <p>Before using GitHub, interviewees’ organizations faced many tech stack challenges, including having to “write homegrown solutions to address the context switching between one open source tool to another,” and “discovering security flaws late in the SDLC or after the code was deployed into production.” In addition, team productivity was impacted by the decentralized management of maintaining legacy open source tools and infrastructure.</p>
        <p><strong>But after using GHEC and GHAS for three years, the composite organization saw:</strong></p>
        <ul>
        <li>Developer productivity gains of 22% </li>
        <li>Tool maintenance productivity gains of 75% by phasing out legacy tools </li>
        </ul>
        <p>Ultimately, GitHub helps enterprises produce better and more secure code—and more quickly—with faster code drops into production.</p>
        <h2 id="improved-security-%f0%9f%94%90">Improved security <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f510.png" alt="🔐" class="wp-smiley" style="height: 1em; max-height: 1em;" /><a href="#improved-security-%f0%9f%94%90" class="heading-link pl-2 text-italic text-bold" aria-label="Improved security &#x1f510;"></a></h2>
        <p>Adopting the right approach to DevSecOps reduces risk and allows teams to deploy quickly and securely. But many businesses find this easier said than done when using legacy tools that aren’t optimized for modern development practices.</p>
        <h3 id="key-challenges">Key challenges<a href="#key-challenges" class="heading-link pl-2 text-italic text-bold" aria-label="Key challenges"></a></h3>
        <p>The organization faced numerous security challenges before moving to GitHub. For one, “interviewees reported that without automation in their organization&#8217;s CI/CD environment, software defects and security vulnerabilities made it far into the SDLC before being detected.” DevOps and DevSecOps teams spent large amounts of time writing custom code to detect code defects and security vulnerabilities across all platforms. And in order to comply with IT audit requirements, respondents said that they had teams of auditors—many who worked full time—gathering documentation and performing internal and external audits from decentralized environments.</p>
        <p><strong>When they implemented GHEC, GHAS, GitHub Pages, GitHub Actions, and Codespaces, the organization saw the following benefits over three years:</strong></p>
        <ul>
        <li>Time savings of $2.7 million USD in IT auditors preparing for audits </li>
        <li>Improved DevOps, DevSecOps, and site reliability engineer efficiency by 15% </li>
        <li>Reduction in time spent on code remediation, resulting in savings of $5.2 million USD</li>
        </ul>
        <p>With fewer vulnerabilities in code production and more granular controls, GitHub is a secure solution for enterprises combating both internal and external threats.</p>
        <h2 id="recruit-and-retain-talent-%f0%9f%a7%91%f0%9f%92%bb">Recruit and retain talent <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f9d1-200d-1f4bb.png" alt="🧑‍💻" class="wp-smiley" style="height: 1em; max-height: 1em;" /><a href="#recruit-and-retain-talent-%f0%9f%a7%91%f0%9f%92%bb" class="heading-link pl-2 text-italic text-bold" aria-label="Recruit and retain talent &#x1f9d1;&#x200d;&#x1f4bb;"></a></h2>
        <p>The world of work looks vastly different than it did a couple of years ago. With that, businesses have to think about what it takes to recruit and retain employees for the long term. And when it comes to software development specifically, intentionally placing the developer experience at the core of your efforts can attract new employees, improve retention, and increase productivity.</p>
        <h3 id="key-challenges">Key challenges<a href="#key-challenges" class="heading-link pl-2 text-italic text-bold" aria-label="Key challenges"></a></h3>
        <p>The onboarding process for a new developer is crucial to ensuring their short-term success and ability to make an immediate impact on the business. Before switching to GitHub, onboarding new developers took 10 days according to interviewees, forcing the organization to pay for unproductive work since “&#8230;new developers need to be trained on the organization&#8217;s methods of coding, but developers also had to learn how to use the various tools that they would need during the SDLC.”</p>
        <p><strong>After implementing GitHub, organizations drastically reduced the time spent training new developers by 80%.</strong></p>
        <p>Ultimately, developers want to use the tools they know and love at work. When businesses use GitHub’s entire platform, tenured developers are happier and new developers can make an impact from day one.</p>
        <h2 id="reduced-costs-%f0%9f%92%b8">Reduced costs <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f4b8.png" alt="💸" class="wp-smiley" style="height: 1em; max-height: 1em;" /><a href="#reduced-costs-%f0%9f%92%b8" class="heading-link pl-2 text-italic text-bold" aria-label="Reduced costs &#x1f4b8;"></a></h2>
        <p>In an increasingly unpredictable macroeconomic environment, business leaders have to be even more strategic when it comes to reducing operational costs and driving efficiency in their organizations.</p>
        <h3 id="key-challenges">Key challenges<a href="#key-challenges" class="heading-link pl-2 text-italic text-bold" aria-label="Key challenges"></a></h3>
        <p>When Forrester interviewed the DevOps and DevSecOps teams in their research, they found that using and maintaining infrastructure for legacy tools incurred annual infrastructure, software, and labor costs to maintain. But by standardizing their development on GHEC and using the power of GHAS and GitHub Actions to perform centralized tasks, many of the legacy servers could be deprecated over time.</p>
        <p><strong>After deploying GHEC, the organization retired its use of legacy tools and realized a total cost of ownership savings of $811,900 USD over three years.</strong></p>
        <p>In short, moving to GitHub eliminates redundant costs and improves site reliability.</p>
        <h2 id="experience-the-power-of-github-yourself-%f0%9f%aa%84">Experience the power of GitHub yourself <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1fa84.png" alt="🪄" class="wp-smiley" style="height: 1em; max-height: 1em;" /><a href="#experience-the-power-of-github-yourself-%f0%9f%aa%84" class="heading-link pl-2 text-italic text-bold" aria-label="Experience the power of GitHub yourself &#x1fa84;"></a></h2>
        <p>As the home for all developers, we build tools that help developers do the best work of their lives. How to make developers more productive, collaborative, happy, and innovative are our bread and butter. And by dedicating ourselves to these goals, we help the companies that hire them meet their goals, too.</p>
        <p>With automated workflows via GitHub Actions, supercharged collaboration tools in the cloud with Codespaces, and native security throughout the developer workflow with GHAS, GitHub improves your time-to-market, increases your revenue growth, and reduces your hardware costs and time spent managing platforms.</p>
        <div class="post-content-cta"><p>Interested in reading the study and driving ROI for your enterprise? <a href="https://resources.github.com/forrester/?utm_source=&#038;utm_medium=&#038;utm_campaign=2020q3-site-ww-ForresterReport&#038;utm_content=Blog">Download it today</a>.</p>
        </div>
        <p><!-- Footnotes themselves at the bottom. --></p>
        <h4 id="notes">Notes<a href="#notes" class="heading-link pl-2 text-italic text-bold" aria-label="Notes"></a></h4>
        <div class="footnotes">
        <hr />
        <ol>
        <li id="fn-69237-1">
        The composite organization is an enterprise with 120,000 employees and 7,000 developers, growing at 500 per year. In addition to using GHEC and GHAS, they also deploy GitHub Actions, Codespaces, GitHub Discussions, and GitHub Pages, and are testing GitHub Copilot. The development team manages 20,000 code repositories and $100,000 in legacy hardware. It used GitHub for five years.&#160;<a href="#fnref-69237-1" title="Return to main content.">&#8617;</a>
        </li>
        </ol>
        </div>
        ]]></content:encoded>
                  
            
            
            <post-id xmlns="com-wordpress:feed-additions:1">69237</post-id>	</item>
            <item>
            <title>Not just flightless birds: How EMUs secure and scale identity and access management for your GitHub Enterprise</title>
            <link>https://github.blog/2022-12-20-emus-more-than-just-flightless-birds/</link>
            
            <dc:creator><![CDATA[Jessi Moths]]></dc:creator>
            <pubDate>Tue, 20 Dec 2022 18:00:13 +0000</pubDate>
                <category><![CDATA[Enterprise]]></category>
            <category><![CDATA[EMUs]]></category>
            <category><![CDATA[GitHub Enterprise Cloud]]></category>
            <guid isPermaLink="false">https://github.blog/?p=69213</guid>
        
                  <description><![CDATA[GitHub Enterprise has evolved to support the needs of enterprise administrators, corporate security teams, and individual developers who contribute to open source.]]></description>
                            <content:encoded><![CDATA[<p><img decoding="async" loading="lazy" src="https://github.blog/wp-content/uploads/2022/12/oksmith-emu.png?w=300&#038;resize=300%2C300" alt="" width="300" height="300" class="alignleft size-medium wp-image-69257 width-fit" srcset="https://github.blog/wp-content/uploads/2022/12/oksmith-emu.png?w=600 600w, https://github.blog/wp-content/uploads/2022/12/oksmith-emu.png?w=150 150w, https://github.blog/wp-content/uploads/2022/12/oksmith-emu.png?w=300&#038;resize=300%2C300 300w, https://github.blog/wp-content/uploads/2022/12/oksmith-emu.png?w=400 400w, https://github.blog/wp-content/uploads/2022/12/oksmith-emu.png?w=200 200w, https://github.blog/wp-content/uploads/2022/12/oksmith-emu.png?w=90 90w, https://github.blog/wp-content/uploads/2022/12/oksmith-emu.png?w=116 116w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" />To understand what Enterprise Managed Users (EMUs) are and the value they can bring, we have to look back at the history of GitHub.</p>
        <p>In 2008, GitHub was created to allow developers to share their source code with the world. The primary focus was on sharing repositories quickly and easily. As the platform grew, organizations began to adopt GitHub and to build out a presence for their business. These organizations had different needs than individual developers—they wanted enterprise features, such as integration with their identity providers and clear delineation between company and public content. GitHub Enterprise was launched over 10 years ago to be the enterprise-ready version of GitHub.com at that time.</p>
        <p>Fast forward to today. GitHub is the complete developer platform used by over 90 million developers and counting. GitHub Enterprise Cloud (GHEC), GitHub’s SaaS enterprise offering, is secured by the best-in-class security team in the industry and trusted by companies around the world. The enterprise has the responsibility to protect identity and data isolation. Security, observability, and compliance are top of mind for administrators, or “enterprise owners” as we call them at GitHub, and there is an increasing emphasis on keeping your account secure.</p>
        <p>As we’ve evolved together, GitHub has made exciting updates to become the complete, integrated platform for developers.</p>
        <p>GHEC has always allowed users to continue to use their single personal GitHub.com account everywhere—whether working with open source projects, personal repositories, or at work (with linked SAML identities, if an administrator sets up that connection.) This “bring your own account” model means a seamless transition between work and personal contexts for developers. For administrators, it allows you as the owner to organize your users and keep track of who is in the account.</p>
        <p>However, at the same time, it can be a challenge for administrators to track who their users are. Additionally, corporate security teams often desire additional guardrails against their users accidentally exposing private content, via more separation between open source and personal GitHub.com activities and using their enterprise plan.</p>
        <h2 id="the-value-of-emus">The value of EMUs<a href="#the-value-of-emus" class="heading-link pl-2 text-italic text-bold" aria-label="The value of EMUs"></a></h2>
        <p>To support these requirements, GitHub has evolved to meet those additional security needs of organizations of all sizes. In <a href="https://github.blog/2021-09-30-enterprise-managed-users-generally-available-github-enterprise-cloud/">2021</a>, GHEC added the EMU model. EMUs allow an enterprise to provision standardized accounts for their users from their identity provider, standardizing usernames, display names, and email addresses. With this new model, the identity provider becomes the single source of truth for user access and account management. Administrators can also scale access and role management by linking groups in the identity provider to GitHub teams when using the EMU model. Increased scale, seamless management, and compliance are the focus of EMU to allow for a complete administrative platform.</p>
        <p>The EMU model also adds more guardrails to protect your organization’s sensitive content. EMU users cannot create public repositories, write any content outside of the enterprise, or collaborate with other users and enterprises on GitHub when logged into their EMU managed account. They may only contribute to your enterprise’s organizations and repositories, which provides extra security and separation between work and personal contexts.</p>
        <h2 id="choosing-the-emu-model">Choosing the EMU model<a href="#choosing-the-emu-model" class="heading-link pl-2 text-italic text-bold" aria-label="Choosing the EMU model"></a></h2>
        <p>Next, we’ll walk you through why you might choose an EMU model, and if it is right for your enterprise.</p>
        <p>You should consider adopting the EMU user model if any of the following statements resonate for your organization’s needs:</p>
        <ul>
        <li>You want to use your identity provider as the single source of truth for managing GitHub user access.</li>
        <li>You want full end-to-end ownership of the accounts your users use in your enterprise.</li>
        <li>You want IdP-synced display names and email addresses, with usernames that are standardized to an enterprise attribute.</li>
        <li>You need more stringent separation between the GitHub accounts users use at work and for personal/open source.</li>
        <li>You need additional guardrails and policies to prevent accidental leaks of sensitive content into publicly-visible areas of GitHub.com.</li>
        </ul>
        <p>The “bring your own account” model of GHEC may still be the right option for many GHEC customers, particularly those whose developers contribute consistently to open source at work and require write capability to the public parts of GitHub.com.</p>
        <p>More details on EMU unique capabilities and caveats can be found in our <a href="https://docs.github.com/en/enterprise-cloud@latest/admin/identity-and-access-management/using-enterprise-managed-users-for-iam/about-enterprise-managed-users#abilities-and-restrictions-of-managed-user-accounts">documentation</a>.</p>
        <p>For customers already using GitHub (of any implementation or plan type) moving to the EMU model does require a migration process, which should also be part of your consideration.</p>
        <p>The EMU model simplifies managing and understanding who users are in the enterprise context, and it gives administrators <em>and</em> end users more peace of mind with increased security and greater separation between work and personal GitHub accounts. Talk to your GitHub account team to discuss further if you think EMUs would be a good fit for your work on GitHub.</p>
        <h2 id="to-learn-more">To learn more<a href="#to-learn-more" class="heading-link pl-2 text-italic text-bold" aria-label="To learn more"></a></h2>
        <p>Read more about <a href="https://docs.github.com/en/enterprise-cloud@latest/admin/identity-and-access-management/using-enterprise-managed-users-for-iam/about-enterprise-managed-users">Enterprise Managed Users</a> in our documentation.</p>
        <p>Stay tuned to <a href="https://github.blog/category/enterprise/">the blog</a> for more information and updates on enhancements to the EMU model.</p>
        ]]></content:encoded>
                  
            
            
            <post-id xmlns="com-wordpress:feed-additions:1">69213</post-id>	</item>
            <item>
            <title>How we use GitHub to be more productive, collaborative, and secure</title>
            <link>https://github.blog/2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secure/</link>
            
            <dc:creator><![CDATA[Mike Hanley]]></dc:creator>
            <pubDate>Tue, 20 Dec 2022 17:00:33 +0000</pubDate>
                <category><![CDATA[Engineering]]></category>
            <category><![CDATA[Product]]></category>
            <category><![CDATA[Security]]></category>
            <category><![CDATA[How GitHub builds GitHub]]></category>
            <guid isPermaLink="false">https://github.blog/?p=69220</guid>
        
                  <description><![CDATA[Our engineering and security teams have done some incredible work in 2022. Let’s take a look at how we use GitHub to be more productive, build collaboratively, and shift security left.]]></description>
                            <content:encoded><![CDATA[<p>It’s that time of year where we’re all looking back at what we’ve accomplished and thinking ahead to goals and plans for the calendar year to come. As part of <a href="https://githubuniverse.com/">GitHub Universe</a>, I shared some numbers that provided a window into the work our engineering and security teams drive each day on behalf of our community, customers, and Hubbers. As someone who loves data, it’s not just fun to see how we operate GitHub at scale, but it’s also rewarding to see how this work contributes to our vision to be the home for all developers–which includes our own engineering and security teams.</p>
        <p>Over the course of the past year<sup id="fnref-69220-1"><a href="#fn-69220-1" class="jetpack-footnote" title="Read footnote.">1</a></sup>, GitHub staff made millions of commits across all of our internal repositories. That’s a ton of branches, pull requests, Issues, and more. We processed billions of API requests daily. And we ran tens of thousands of production deployments across the internal apps that power GitHub’s services. If you do the math, that’s hundreds of deploys <em>per day</em>.</p>
        <p>GitHub is big. But the reality is, no matter your size, your scale, or your stage, we’re all dealing with the same questions. Those questions boil down to how to optimize for <strong>productivity</strong>, <strong>collaboration</strong>, and, of course, <strong>security</strong>.</p>
        <p><img decoding="async" loading="lazy" src="https://github.blog/wp-content/uploads/2022/12/productivity-collaboration-security.png?w=1024&#038;resize=1024%2C582" alt="" width="1024" height="582" class="aligncenter size-large wp-image-69222 width-fit" srcset="https://github.blog/wp-content/uploads/2022/12/productivity-collaboration-security.png?w=1600 1600w, https://github.blog/wp-content/uploads/2022/12/productivity-collaboration-security.png?w=300 300w, https://github.blog/wp-content/uploads/2022/12/productivity-collaboration-security.png?w=768 768w, https://github.blog/wp-content/uploads/2022/12/productivity-collaboration-security.png?w=1024&#038;resize=1024%2C582 1024w, https://github.blog/wp-content/uploads/2022/12/productivity-collaboration-security.png?w=1536 1536w" sizes="(max-width: 1000px) 100vw, 1000px" data-recalc-dims="1" /></p>
        <p>It’s a running joke internally that you have to type “GitHub” three times to get to the monolith. So, let’s take a look at how we at GitHub (1) use GitHub (2) to build the GitHub (3) you rely on.</p>
        <h2 id="productivity">Productivity<a href="#productivity" class="heading-link pl-2 text-italic text-bold" aria-label="Productivity"></a></h2>
        <p>GitHub’s cloud-powered experiences, namely Codespaces and GitHub Copilot, have been two of the biggest game changers for us in the past few years.</p>
        <p><img decoding="async" loading="lazy" src="https://github.blog/wp-content/uploads/2022/12/productivity.png?w=1024&#038;resize=1024%2C582" alt="" width="1024" height="582" class="aligncenter size-large wp-image-69223 width-fit" srcset="https://github.blog/wp-content/uploads/2022/12/productivity.png?w=1600 1600w, https://github.blog/wp-content/uploads/2022/12/productivity.png?w=300 300w, https://github.blog/wp-content/uploads/2022/12/productivity.png?w=768 768w, https://github.blog/wp-content/uploads/2022/12/productivity.png?w=1024&#038;resize=1024%2C582 1024w, https://github.blog/wp-content/uploads/2022/12/productivity.png?w=1536 1536w" sizes="(max-width: 1000px) 100vw, 1000px" data-recalc-dims="1" /></p>
        <h3 id="codespaces">Codespaces<a href="#codespaces" class="heading-link pl-2 text-italic text-bold" aria-label="Codespaces"></a></h3>
        <p>It’s no secret that local development hasn’t evolved much in the past decade. The github/github repository, where much of what you experience on GitHub.com lives, is fairly large and took several minutes to clone even on a good network connection. Combine this with setting up dependencies and getting your environment the way you like it, spinning up a local environment used to take 45 minutes to go from checkout to a built local developer environment.</p>
        <p>But now, with Codespaces, a few clicks and less than 60 seconds later, you’re in a working development environment that’s running on faster hardware than the MacBook I use daily.</p>
        <p>Heating my home office in the chilly Midwest with my laptop doing a local build was nice, but it’s a thing of the past. <a href="https://github.blog/2021-08-11-githubs-engineering-team-moved-codespaces/">Moving to Codespaces last year</a> has truly impacted our day-to-day developer experience, and we’re not looking back.</p>
        <h3 id="github-copilot">GitHub Copilot<a href="#github-copilot" class="heading-link pl-2 text-italic text-bold" aria-label="GitHub Copilot"></a></h3>
        <p>We’ve been using GitHub Copilot for more than a year internally, and it still feels like magic to me every day. We recently <a href="https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/">published a study</a> that looked at GitHub Copilot performance across two groups of developers–one that used GitHub Copilot and one that didn’t. To no one’s surprise, the group that used GitHub Copilot was able to complete the same task 55% faster than the group that didn’t have GitHub Copilot.</p>
        <p>Getting the job done faster is great, but the data also provided incredible insight into developer satisfaction. Almost three-quarters of the developers surveyed said that GitHub Copilot helped them stay in the flow and spend more time focusing on the fun parts of their jobs. When was the last time you adopted an experience that made you love your job more? It’s an incredible example of putting developers first that has completely changed how we build here at GitHub.</p>
        <h2 id="collaboration">Collaboration<a href="#collaboration" class="heading-link pl-2 text-italic text-bold" aria-label="Collaboration"></a></h2>
        <p>At GitHub, we’re remote-first and we have highly distributed teams, so we prioritize discoverability and how we keep teams up-to-date across our work. That&#8217;s where tools like Issues and projects come into play. They allow us to plan, track, and collaborate in a centralized place that’s right next to the code we’re working on.</p>
        <p><img decoding="async" loading="lazy" src="https://github.blog/wp-content/uploads/2022/12/collaboration.png?w=1024&#038;resize=1024%2C572" alt="" width="1024" height="572" class="aligncenter size-large wp-image-69224 width-fit" srcset="https://github.blog/wp-content/uploads/2022/12/collaboration.png?w=1600 1600w, https://github.blog/wp-content/uploads/2022/12/collaboration.png?w=300 300w, https://github.blog/wp-content/uploads/2022/12/collaboration.png?w=768 768w, https://github.blog/wp-content/uploads/2022/12/collaboration.png?w=1024&#038;resize=1024%2C572 1024w, https://github.blog/wp-content/uploads/2022/12/collaboration.png?w=1536 1536w" sizes="(max-width: 1000px) 100vw, 1000px" data-recalc-dims="1" /></p>
        <p><a href="https://github.blog/2022-07-01-how-the-github-security-team-uses-projects-and-github-actions-for-planning-tracking-and-more/">Incorporating projects across our security team</a> has made it easier for us to not only track our work, but also to help people understand how their work fits into the company’s broader mission and supports our customers.</p>
        <p>Projects gives us a big picture view of our work, but what about the more tactical discovery of a file, function, or new feature another team is building? When you’re working on a massive 15-year-old codebase (looking at you, GitHub), sometimes you need to find code that was written well before you even joined the company, and that can feel like trying to find a needle in a haystack.</p>
        <p>So, we’ve adopted the <a href="https://github.blog/2022-11-15-a-better-way-to-search-navigate-and-understand-code-on-github/">new code search and code view</a>, which has helped our developers quickly find what they need without losing velocity. This improved discoverability, along with the enhanced organization offered by Issues and projects, has had huge implications for our teams in terms of how we’ve been able to collaborate across groups.</p>
        <h2 id="shifting-security-left">Shifting security left<a href="#shifting-security-left" class="heading-link pl-2 text-italic text-bold" aria-label="Shifting security left"></a></h2>
        <p><img decoding="async" loading="lazy" src="https://github.blog/wp-content/uploads/2022/12/security.png?w=1024&#038;resize=1024%2C577" alt="" width="1024" height="577" class="aligncenter size-large wp-image-69225 width-fit" srcset="https://github.blog/wp-content/uploads/2022/12/security.png?w=1600 1600w, https://github.blog/wp-content/uploads/2022/12/security.png?w=300 300w, https://github.blog/wp-content/uploads/2022/12/security.png?w=768 768w, https://github.blog/wp-content/uploads/2022/12/security.png?w=1024&#038;resize=1024%2C577 1024w, https://github.blog/wp-content/uploads/2022/12/security.png?w=1536 1536w" sizes="(max-width: 1000px) 100vw, 1000px" data-recalc-dims="1" /></p>
        <p>Like we saw when we looked at local development environments, the security industry still struggles with the same issues that have plagued us for more than a decade. Exposed credentials, as an example, are still the root cause for more than half of all data breaches today<sup id="fnref-69220-2"><a href="#fn-69220-2" class="jetpack-footnote" title="Read footnote.">2</a></sup>. Phishing is still the best, and cheapest, way for an adversary to get into organizations and wreak havoc. And we’re still pleading with organizations to implement multi-factor authentication to keep the most basic techniques from bad actors at bay.</p>
        <p>It’s time to build security into everything we do across the developer lifecycle.</p>
        <p>The software supply chain starts with the developer. Normalizing the use of strong authentication is one of the most important ways that we at GitHub, the home of open source, can help defend the entire ecosystem against supply chain attacks. We enforce multi-factor authentication with security keys for our internal developers, and we’re requiring that every developer who contributes software on GitHub.com <a href="https://github.blog/2022-12-14-raising-the-bar-for-software-security-next-steps-for-github-com-2fa/">enable 2FA</a> by the end of next year. The closer we can bring our security and engineering teams together, the better the outcomes and security experiences we can create together.</p>
        <p>Another way we do that is by <a href="https://github.blog/2022-04-19-sharing-security-expertise-through-codeql-packs-part-i/">scaling the knowledge of our security teams with tools like CodeQL</a> to create checks that are deployed for all our developers, protecting all our users. And because the CodeQL queries are open source, the vulnerability patterns shared by security teams at GitHub or by our customers end up as CodeQL queries that are then available for everyone. This acts like a global force multiplier for security knowledge in the developer and security communities.</p>
        <p>Security shouldn’t be gatekeeping your teams from shipping. It should be the process that enables them to ship quickly–remember our hundreds of production deployments per day?–and with confidence.</p>
        <h2 id="big-small-or-in-between">Big, small, or in-between<a href="#big-small-or-in-between" class="heading-link pl-2 text-italic text-bold" aria-label="Big, small, or in-between"></a></h2>
        <p>As you see, GitHub has the same priorities as any other development team out there.</p>
        <p>It doesn&#8217;t matter if you’re processing billions of API requests a day, like we are, or if you’re just starting on that next idea that will be launched into the world.</p>
        <p>These are just a few ways over the course of the last year that we’ve used GitHub to build our own platform securely and improve our own developer experiences, not only to be more productive, collaborative, and secure, but to be creative, to be happier, and to build the best work of our lives.</p>
        <p><div class="post-content-cta"><p><em>To learn more about how we use GitHub to build GitHub, and to see demos of the features highlighted here, take a look at this talk from GitHub Universe 2022.<em></p>
        <div style textalign="center">
        <iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/R6iRccrJ_jg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        </div><br />
        </p>
        <p><!-- Footnotes themselves at the bottom. --></p>
        <h4 id="notes">Notes<a href="#notes" class="heading-link pl-2 text-italic text-bold" aria-label="Notes"></a></h4>
        <div class="footnotes">
        <hr />
        <ol>
        <li id="fn-69220-1">
        Data collected January-October 2022&#160;<a href="#fnref-69220-1" title="Return to main content.">&#8617;</a>
        </li>
        <li id="fn-69220-2">
        <a href="https://www.verizon.com/business/resources/reports/dbir/">Verizon DBIR</a>&#160;<a href="#fnref-69220-2" title="Return to main content.">&#8617;</a>
        </li>
        </ol>
        </div>
        ]]></content:encoded>
                  
            
            
            <post-id xmlns="com-wordpress:feed-additions:1">69220</post-id>	</item>
            <item>
            <title>[Video] How has open source changed in the last 10 years?</title>
            <link>https://github.blog/2022-12-19-video-how-has-open-source-changed-in-the-last-10-years/</link>
            
            <dc:creator><![CDATA[Martin Woodward]]></dc:creator>
            <pubDate>Mon, 19 Dec 2022 15:14:22 +0000</pubDate>
                <category><![CDATA[Community]]></category>
            <category><![CDATA[Open Source]]></category>
            <category><![CDATA[GitHub Universe]]></category>
            <category><![CDATA[Octoverse]]></category>
            <guid isPermaLink="false">https://github.blog/?p=69175</guid>
        
                  <description><![CDATA[What’s the state of open source and how has it changed over the last decade? GitHub’s VP of Developer Relations, Martin Woodward, tackles that question and more in a 2022 keynote. ]]></description>
                            <content:encoded><![CDATA[<div style="text-align: center;">
        <iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/lTisOy1qcPQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p>&nbsp;</p>
        <p>In the latest Octoverse report, we explored the state of open source, how it’s evolving, and key trends shaping software development. The long and short of it: It’s been a tremendously big year for open source, and we’re seeing big gains across the board.</p>
        <p>That formed the genesis of GitHub’s Vice President of Developer Relations Martin Woodward&#8217;s presentation of the findings at Universe 2022—which you can watch in the video above (and there’s a transcript below).</p>
        <p>Among his key takeaways:</p>
        <ol>
        <li><strong>We&#8217;re seeing a rise in infrastructure as code.</strong> There has been tremendous growth in HCL usage in public repositories—and we’re also seeing a growing number of people using Shell and Go. That all points to infrastructure-as-code teams sharing more in the open source communities, and more people adopting infrastructure-as-code practices.</li>
        <li><strong>Big tech companies are building big open source communities.</strong> This past year, we’ve seen that some of the most popular open source projects—and some of the biggest open source communities—are commercially backed by some of the biggest technology companies (Google, Microsoft, Meta, etc.). It&#8217;s not just big tech that are engaging with open source. We see that every large successful commercial software company now has an open source strategy.</li>
        <li><strong>Open source is stronger than ever.</strong> Open source and the open source community is stronger than ever. In the past year alone, more than 20 million people from across the world joined GitHub. What’s more, over 227 million pull requests were merged and over 31 million issues closed. The pace of activity in the developer community keeps accelerating. Last year we saw over 413 million contributions made to the open source projects on GitHub.</li>
        </ol>
        <p>You can explore the data and findings yourself in <a href="https://octoverse.github.com/">this year’s Octoverse report</a>.</p>
        <details>
        <summary>
        <strong>Below you’ll find a transcript that’s been lightly edited for clarity. This session was one of many from our 2022 GitHub Universe. You can <a href="https://www.youtube.com/@GitHub/playlists?view=50&#038;sort=dd&#038;shelf_id=2">find more sessions on our YouTube channel</a>.</strong><br />
        </summary>
        <p>Wow, has it started raining outside? That&#8217;s a lot more people than I was expecting for the last one of the conference. Anyway, welcome to the very last session. Thank you for coming. My name&#8217;s Martin Woodward. I work on developer relations at GitHub. Have you had a great conference so far? Has it been good?
        </p>
        <p>It&#8217;s been good to be here in person. I hope you&#8217;ve learned something new, you&#8217;ve met some new people, you&#8217;ve done some networking. So, whether you&#8217;re joining us online or if you&#8217;re here in person, we&#8217;re going to get started. </p>
        <p>So today we&#8217;re going to talk about the Octoverse report. It&#8217;s <a href="https://octoverse.github.com/">now available online on the GitHub website</a>, so feel free to go take a look at it. The Octoverse report, you know, we do every single year to kind of really dig in and look at the data of what&#8217;s been happening on GitHub, and then by extension during sort of correlation to what&#8217;s happening in the general open source ecosystem.</p>
        <p>So that&#8217;s what we&#8217;re going to do today. You ready? You ready for some graphs? Okay. I&#8217;m going to try and make tables look fun for you now. Okay folks, bear with me while I tap dance a little bit. Right, as Thomas was saying in his keynote yesterday, that first commit to GitHub was 15 years ago now, and we&#8217;re actually celebrating another milestone here today at Universe.</p>
        <p>Today it&#8217;s actually my honor to wish a happy 10th birthday to the Octoverse report. Woo! All those fireworks [looking at screen]—somebody did an amazing job. Since 2012 actually, we&#8217;ve been reporting on this state of the Octoverse report. Because we are in this really privileged position of being able to see what the wider trends are, see the data coming in from open source projects, and really bring those to our customers from this unique viewpoint that we have and that we&#8217;re privileged to have here at GitHub.</p>
        <p>One of the things that&#8217;s always been amazing to me—and I&#8217;ve been a fan of the Octoverse Report since it first came out in 2012—is just the phenomenal growth of the community on GitHub. We keep seeing the number of developers coming to GitHub just accelerating year over year.</p>
        <p>From that first commit on the GitHub code back in 2007—October 2007—if you&#8217;d asked me back then. Like how many developers are there in the world, I&#8217;d have probably said around about 12 million. I have no idea if that&#8217;s true or not, but that&#8217;s what I used to tell people back in 2007. And I used to work in developer tools back then—like it was kind of my job to know these things.</p>
        <p>But, you know, that&#8217;s roughly what we thought. Clearly, there&#8217;s a lot more than that. GitHub grows by more than that every single year. So, you know, there&#8217;s something interesting happening here. In fact, as Thomas mentioned yesterday, today there are over 94 million developers on GitHub—94 million! That&#8217;s just mind-boggling.</p>
        <p>That&#8217;s an astoundingly big number. We as humans, we&#8217;re just terrible at big numbers. To try and put that into perspective, I was going to  like figure out how many elephants that would take in, like the Carnegie Hall or something. But how about this? If we take the entire population of California, Texas, and Florida, and if you combine them—that&#8217;s actually less than 94 million.</p>
        <p>This is a picture of where I live, taken from space [pointing to a map of Northern Island]. This is from the—this isn&#8217;t live. If it was live, you would just see clouds, to be honest, because I live in Northern Ireland just up there. And if you take the entire population of the UK and Ireland combined, that&#8217;s still 20 million less people than are in this picture here.</p>
        <p>So 94 million is a lot of people, and that&#8217;s a huge responsibility for us here at GitHub and one we all feel hugely. But it&#8217;s just mind-blowing. So as I say, clearly something&#8217;s going on here or what&#8217;s happening with, you know, developers in the world. What I think’s happening is what we used to think of who could be a developer, you know, what their background is, what they do for a job, where they come from—that&#8217;s all changed dramatically in those 10 years since we first started doing the Octoverse report. </p>
        <p>In 2012, the largest community of open source developers was in the US and kind of parts of Western Europe. There were some populations elsewhere—Asia had a big community. But broadly speaking, it was kind of those areas where we were talking about in terms of like the raw numbers. </p>
        <p>But today if we look at numbers, we can see huge changes in terms of growth where these developers are coming from across the whole globe. And as you heard this morning in—did you check out Stormy&#8217;s keynote this morning?</p>
        <p>Yep. As you heard this morning in Stormy keynote, we see these communities working together on open source projects, and they&#8217;re coming together for the good of the entire planet, which is amazing. So, when we take a look at the entire global population, we can see, you know, map out hotspots across the globe.</p>
        <p>In a minute I&#8217;m going to start shouting out places. So for people in the audience from these places, feel free to give a whoop or whatever, you know, to represent your audience. And definitely online, I want people to be tweeting when they hear their country mentioned. </p>
        <p>So you see bright spots everywhere, as you can see on this graph. We&#8217;re actually continuing to see open source is kind of helping democratize access to technology. It&#8217;s helping countries make their mark on the global stage. </p>
        <p>One country that&#8217;s massively made its mark in the past 10 years is India. India is now truly a powerhouse of software development and software innovation. We see lots of highly regarded universities and technical colleges in India. I&#8217;m sure many of you have colleagues who work in India and are based there. And there&#8217;s this ready high-tech sort of jobs market that&#8217;s there now. This was initially driven by a lot of the GSIs, the global systems integrators, which meant that we had, you know, more and more students coming out ofthese, these technical colleges in India and taking formal computer science qualifications, taking formal IT qualifications, and then they knew there was a ready jobs market for them to go to in the industry.</p>
        <p>And in fact, we have seen increasing investments from these large GSIs into open source over the past few years. We’re definitely seeing that. But what we&#8217;re also seeing is this new wave of entrepreneurial startups coming from India, many of them powered by open source.<a href="https://youtu.be/AYRxDoUxcfQ?t=1434"> Naytri in the keynote yesterday</a> talked about how we did the grants program in India and then people have taken those and built open source businesses based in India.</p>
        <p>And we&#8217;re actually seeing this new wave of students and entrepreneurs—but the students are using open source to learn and to cut their teeth on what it&#8217;s, and what it&#8217;s really like contributing to, you know, a global technical community. </p>
        <p>I don’t know if you’ve done your formal sort of computer science training—I actually didn&#8217;t do computer science. I did a degree in physics, so you know, what do I know? But anyway, all I know from talking to computer science folks is they all hate those group projects because you&#8217;re working great and then you go do a group project and all of a sudden you have to work with other people and that&#8217;s a nightmare.</p>
        <p>So, these people and these students are actually using open source projects to learn what it&#8217;s really like to work in a distributed global technical community. And we see people hungry to learn and very, very keen on improvement there. </p>
        <p>So, you know, you can forget that I used to think of the 12 million number that I used to think, you know, but at the total population. India alone now has got nearly 10 million developers working on open source. Two and a half million developers from India joined GitHub in the last year alone—two and a half million! So at that rate of growth, India could well have more developers in 2025 working on open source than actually America has today. You know, they&#8217;re catching up fast. India is on track to position itself as kind of the global leader in open source innovation as its continuing today, with all the people who are contributing.</p>
        <p>And actually it&#8217;s not just India where we see this huge growth. If we look in LATAM, we see that Brazil continues to dominate when it comes to the total—ya, represent! I knew there be one, because there are 3 million developers in Brazil. Like that&#8217;s the number that they&#8217;ve broken through. It&#8217;s amazing!</p>
        <p>And when it comes to this total developer population, we see that growing substantially. When we also see, as well as kind of Brazil and the powerhouse there, we&#8217;re seeing open source breaking into a lot of the Spanish-speaking LATAM countries from Argentina to Columbia to Chile, and they&#8217;re all now topping the charts in terms of people coming into open source. We saw all of these grow by a third—well over a third in some cases—just in 2022 alone.</p>
        <p>Now then in Africa, we see Nigeria—oh, come on, I know there are people from Nigeria in the conference, right? I&#8217;m going to  find you this evening. I&#8217;m going to have a word. Well, Nigeria continues to be the engine of open source and we are seeing massive growth and this amazing new group of entrepreneurial developers that are growing, that are learning.</p>
        <p>The growth in Nigeria actually continues to be accelerating well over half a million now. See that 70% growth nearly in Nigeria? Now Morocco, who many of us have worked with Moroccan-based developers, it&#8217;s got a very large and very well established technical community. It continues to grow, but we&#8217;re seeing that getting outstripped really by this growth in Nigeria. </p>
        <p>And then we see around Nigeria, we&#8217;ve got Kenya and Ghana. Their tech communities are growing very, very rapidly, too. In fact, it didn&#8217;t fit on my on my slide here, but just off this chart, we saw like 60% growth in Ethiopia, which is crazy. Now it&#8217;s still got a little way to go before it catches up to Ghana, but it&#8217;s rising fast at that rate and it&#8217;s fantastic.</p>
        <p>Open source is helping bring new developers into technology. It&#8217;s helping create the next wave of entrepreneurs and businesses as well. Access to the technology though, it&#8217;s still far from equal. The exact same laptop you can walk down the street and go purchase from the Apple store—it costs a lot more in Nairobi than it does in New York. The exact same machine, and the medium incomes between those cities is, is vast. It’s not a good situation—people are paying more for technology and also bandwidth. While it&#8217;s improving rapidly, especially with cellular bandwidth, it&#8217;s still more expensive to get in a lot of these countries, it&#8217;s harder to get and it&#8217;s a lot less reliable than it needs to be. </p>
        <p>But despite all those disadvantages, we see a huge appetite for growth and there&#8217;s just no shortage of talented developers in those countries wanting to make a difference to the world, wanting to contribute on the global stage. </p>
        <p>In fact, we saw across the world in 2022, we saw a growth in open source contribution from every single continent on the planet except one: Antarctica </p>
        <p>Now, Antarctica&#8217;s the bane of my life. Every year when we are organizing this conference, I talked to Adam Walden (who&#8217;s around) where I want do a thing where we have live people come from every single conference, every single continent. I want to be the person that gets sent to Antarctica. I want tobe there with penguins and talk about open source. I know I&#8217;ll make up some sort of story. It&#8217;ll be amazing. Sadly, we, uh, we haven&#8217;t done that. </p>
        <p>But there&#8217;s always been this small population of developers in Antarctica. Now I&#8217;m a bit of a nerd if you hadn&#8217;t already noticed. And I kind of always assumed that this was like just a bug to be honest.</p>
        <p>In our—uh, sorry, I&#8217;ll pronounce that in American: abug. Uh, a defect. How about that? An issue? Okay. I always thought that was a problem with our IPGO location databases. Like really? Antarctica? But then in 2021 to 2022, we saw a decline in total population, which I didn&#8217;t understand.</p>
        <p>And then—now admittedly, it&#8217;s like it&#8217;s a handful, you know, there weren&#8217;t that many people in Antarctica anyway, it was just a small handful of people who were no longer in Antarctica. But I kind of can&#8217;t let problems go. So, I dug in. I had a look at what organization they were contributing to in open source. I thought, oh, that&#8217;s interesting. So, I gave them a call. </p>
        <p>Turns out they&#8217;re on this boat in 2021 [points to the screen]. In 2021, they were part of the Australian Antarctic Program, and they&#8217;re actually in Antarctica. Like they were part the Australian Antarctic Program conducting research into krill in the seas around Antarctica.</p>
        <p>In fact, this paper that they&#8217;ve recently published is all about measuring the abundance of krill. So on this particular rabbit hole I went on, I sort of started reading all about their research on krill. Well, it might not sound that interesting—actually, it&#8217;s really important it turns out! </p>
        <p>According to the paper, because it’s—sorry, I&#8217;ll get back to the script in a minute. It&#8217;s about the food chain and it&#8217;s like a leading indicator of ocean health and as many of the species that are based actually, um, like the large mammals and things like that, and whales.Measuring krill population helps them detect the health of the large mammals in the sea. </p>
        <p>So, cool research, and as you saw in the keynote this morning actually, more and more science is being done on GitHub. This mission, in many ways was, was very, very, very similar to the science missions you&#8217;ve heard about this morning from, you know, flying helicopters on Mars, taking pictures, of the earliest moments in the universe.</p>
        <p>When you look at the deep field image [from the James Webb telescope], you are looking at back in time at the creation of the universe. They&#8217;re using the James Webb space telescope to search the habitable planets in other solar systems. All that science is happening in the open. </p>
        <p>This team [in Antarctica] were actually analyzing raw data and—it was kind of like a DevOps way of working to be honest—they&#8217;re analyzing the data from the ship in Antarctica and they&#8217;re sharing that data in real time. See, I can pronounce data in American as well. They can take that data and share it in real time with a larger community of researchers back home in Australia and actually Japan and places. And then together they work on the data that they&#8217;re using and using GitHub and using open source, the scientists collaborate and they really kind of push the boundaries that they&#8217;re bringing the knowledge of our planet forwards.</p>
        <p>So anyway, on a bit of a rabbit hole, sorry. If you want to know more about this mission, if you go search up the Tempo Voyage you can go read all about it. They&#8217;ve got, you know, great research— they messed my stats a little bit, if I&#8217;m honest, so I&#8217;m a bit annoyed with them.</p>
        <p>But actually you&#8217;re never going to meet a nicer bunch of people. So, thanks. If you&#8217;re watching online for taking my phone call. I really love my job. It&#8217;s amazing the people that will answer your phone when you say you work at GitHub, it&#8217;s brilliant. </p>
        <p>Okay? Right. So, I&#8217;m looking forward to reading more about their papers from a 2021 mission and in fact, there&#8217;s one that they&#8217;re doing—it was digging into the language of whale song. </p>
        <p>So, while the language of whale song isn&#8217;t going to be topping the charts anytime soon,  in the past 10 years—look at that for a transition. Okay. Right. In the past 10 years, we&#8217;ve seen big changes in the programming languages. I&#8217;m back to the script now, we&#8217;re good. In the changes of programming language that we see when publishing to public repositoriess on. </p>
        <p>So, um, now if we take a look at this graph, I&#8217;m just going tonavigate you on this graph. If we take TypeScript, you can see it&#8217;s flat and then goes way up around about 2017 and then up to where it is at number four in the charts. JavaScript, number one over time, big dog. And then you&#8217;ve got Python that&#8217;s gone up and on. Does that make sense? </p>
        <p>So, considering the amount of code that&#8217;s published to GitHub every single year, one of the remarkable things about this [graph] is actually how stable it is really. As developers, we are kind of willing to declare technology as dead quite often just because the cool kids aren&#8217;t talking about it.</p>
        <p>And in fact, when we look at this, the only real changes you can see are C++ and PHP kind of flipped places and it happened last year. Look at that renewed growth in Shell scripting—of all things! Now it&#8217;s ahead of straight C—and it&#8217;s not because straight C’s gone down. Shell usage is going up. And you know, before the age of GitHub, C++ and C was kind of the majority of open source contribution. So, that’s a big change. </p>
        <p>JavaScript obviously continues to dominate, you know. We&#8217;ve seen this huge rise in Python over the past 10 years. And you know, as we&#8217;ve been reporting about the programming language changes and things, we see Python getting used everywhere. We see it on, you know, data science, space science, the biggest clusters in the world on those little hackable conference badges that the cool kids got. Um, a few of those, you know—who scored on those build badges by the way? The hacker ones? Yeah. Okay. Aren&#8217;t you lucky, right? Uh, a few of them got some there.</p>
        <p>Python, it just continues to be this, you know, this fantastic general purpose language. It&#8217;s really easy for developers to pick up. And one of the things I really love about the Python community actually is it&#8217;s got this massive, um—it&#8217;s just a really great welcoming, diverse community to get involved in. And it&#8217;s, you know, it&#8217;s just, it&#8217;s a great place for cutting edge science.</p>
        <p>So it&#8217;s great to see Java still going strong. I actually started out my career as a Java developer. And the reason I&#8217;m standing here on this stage today is actually becauseI got involved in the early Java community. So, yeah, anyway right. </p>
        <p>We&#8217;ve seen TypeScript, too, growing. It kind of shows the need for a more strongly typed JavaScript, especially in large teams. I&#8217;ll just do a quick funny [side story], if you can bear with me, I&#8217;ll do it. Funny story about type. I actually used to work at Microsoft with a few people, but I remember vividly the day that Amanda Silver and Anders Hejlberg came to my door and they wanted to say they wanted to release this new strongly type flavor of JavaScript.</p>
        <p>I agreed to help them. TypeScript is—actually I created the GitHub org for Microsoft in 2014, and that TypeScript was the reason I created that org actually. But I remember, you know, when they were talking to me thinking, yeah, right, okay. You know Microsoft. Okay, sure. Yeah, that&#8217;ll never catch on, but I&#8217;ll let them do it. You know, I helped them and you know, what do I know? Hey, that shows you what I know! </p>
        <p>Another language that has been really on the growth has been C#. And if you look at the graph, you can actually see where .NET went from a closed to an open source ecosystem by the growth in C# over the many years that we&#8217;ve been doing this Octoverse report.</p>
        <p>And that&#8217;s how the change in open source has helped that language and that platform. And it&#8217;s had a huge impact on its popularity. </p>
        <p>So, I&#8217;m a developer, as I mentioned. I want to dig in a bit deeper below the usual top 10 and see what the fastest growing languages of 2022 might be, and maybe who might make the list in 2023.</p>
        <p>So, if we have a look at this—ta da! Interestingly, when we look at the number of developers—this is by the number of developers pushing changes for different languages. We see some of the cool kids here—you know, like Rust and Go and Lua, yeah, and Kotlin are on the rise. </p>
        <p>But yeah, look at this. Super cool, kids. HCL—the number one growing language on GitHub right now is HCL. And believe it or not, Shell’s there as I mentioned. 1.1 million, up nearly a third of people. So this isn&#8217;t like pushes. This is the number of people pushing that language to open source repositories on GitHub. </p>
        <p>Shell on the list of growth languages. In like, what year is it? 2022. I know it&#8217;s been a long week, but yeah. 2020? 2022? Something like that. So, what&#8217;s going on? What&#8217;s happening here? So, things like Terraform—they&#8217;ve been helping the rise of popularity of HCL for a while. But Shell? It&#8217;s not exactly new. You know it&#8217;s been there as long as the open source technology&#8217;s been there.</p>
        <p>So, it kind of actually takes me to one of my top three takeaways as I read through the Octoverse report this year. We&#8217;re seeing this rise of infrastructure of code as code, of GitOps—a lot of what more traditionally had been kind of the domain of ops teams. A lot of that domain has really been coming into open source and the open source ecosystem on GitHub.</p>
        <p>Traditionally, these groups have kind of been slower, shy. I&#8217;m trying to think of the politest term. They&#8217;ve been slower to share their changes using version control at all, to be honest. But they&#8217;ve definitely not been as active in open source. And so as more and more traditional developers in those, you know, the traditional like programming language communities like JavaScript and Java and C#, they&#8217;ve always been using open source. Some of the more operational teams haven&#8217;t really, so we see this tremendous growth in HCL usage in public repositoriess. We see growth in Shell and Go, and that all points to infrastructure-as-code teams sharing more. We&#8217;re seeing more and more people working on infrastructure as code, using GitHub to share their code with their community in the open.</p>
        <p>Kubernetes actually was one of the fastest growing communities on GitHub. And it&#8217;s got a highly competitive field of cloud providers chasing those workloads. So you know, we&#8217;re used to seeing that. Terraform’s great if you combine it with, say, GitHub Actions for CI and CD, you can get incredibly reliable deployments, incredibly reliable infrastructure-as-code migrations and deployment.</p>
        <p>So it&#8217;s all just helping automate, you know, deployments and things like that. In 2022, we&#8217;re actually seeing some of the best practices are these high performing DevOps teams—they&#8217;re really making it into the mainstream audience now, and it&#8217;s great to see them kind of sharing it with the open source community as a whole.</p>
        <p>Right. That takes me to my second point, which is when I look at this year&#8217;s data, I see that once the preserve of kind of anti-establishment—you, I’ve been an open source advocate my entire life; I&#8217;ve been a big believer in open source. I owe my career to open source. We see that these anti-establishment people, you know, while we are kind of worried that when we see some of these larger companies getting involved in open source, we can actually see some of these big tech companies are actually creating some of the biggest communities that we have in open source.</p>
        <p>Honestly, it&#8217;s not just big tech that are doing this. We see every large successful commercial software company now has an open source strategy. When we look at the top projects though by contributors—so, this is the size of the community in 2020—we see significant influence here from big tech.</p>
        <p>If you look at it, Home Assistant, there is actually probably the clear standout. Have they been— Home Assistant, anybody? Woo! Okay. If you haven&#8217;t been down this rabbit hole yet, you are all nerds as well. Home Assistant is like home automation, you plug a Rasberry Pi in, [and it] helps connect a bunch of stuff together.</p>
        <p>And now if you take it from me, that—especially during the pandemic—Home Assistant, home automation rabbit hole is a deep one. You&#8217;re going to  be like automating everything. Lots of tinkering, lots of fun hours. I could even tell you right now what a temperature is in my office, what the air quality is, how much oil we have left, you know, it&#8217;s all good.</p>
        <p>So the Home Assistant project, they&#8217;ve done a phenomenal job. They&#8217;ve welcomed people into the community and for a project that really doesn&#8217;t have any big tech sponsorship, um, some of the maintainers have formed a company called Nabu Casa, which sells hardware and some services around the project. But it&#8217;s still really a—it&#8217;s not big tech. It’s very much a volunteer-led community. And in terms of contribution, we see them doing really well. Right? </p>
        <p>We see my old company, Microsoft, doing incredibly well on this. And in fact, to see so many people in their communities now, it&#8217;s a huge validation of that shift they took back in 2014 when I created the TypeScript org. Azure documentation? On the list of like one of the largest projects for any open source project? That&#8217;s not something I would&#8217;ve predicted either eight years ago if I’m honest.</p>
        <p>We see Meta&#8217;s investments in React have had, you know, a huge impact on the open source ecosystem. Entire communities like Next.js, Material UI, and even like high-growth startups like Vercel spawning out of that investment in the React ecosystem. And for Meta’s PyTorch, it’s growing really fast. But in terms of machine learning, the TensorFlow community, which is led by Google on there—that saw massive growth in 2022 as well. And actually, speaking of Google, if you look, Flutter is at the top there. It&#8217;s an open source framework for building mobile applications cross platform. It&#8217;s amazing—really, really popular. </p>
        <p>So, right. Oh, one last shout act actually to NixOS. It&#8217;s going strong. It&#8217;s a Linux‐based community on GitHub, mostly outside of the influence of, of like larger tech companies and things, to be honest. But it&#8217;s a project I kind of need to dig into more. Um, I haven&#8217;t played with it myself.</p>
        <p>A lot of the people I know, like the smart folks in the configuration as code community, they&#8217;re definitely getting into it. A lot of people I respect. So that&#8217;s a project I&#8217;m going to go look at. </p>
        <p>So, what can we learn from these numbers that we want to apply to—that businesses can apply to successful strategies when it comes to open source? When you all get back home and you wanna, you know, have a successful open source strategy.</p>
        <p>The main lesson we see is that the communities thrive when they are part of the community they&#8217;re in. So, when companies shift their engineering teams from working behind the firewall to working outside. So, making people inside the firewall follow the same processes, the same contribution processes as everybody else in that community. By doing that, while these companies have significant engineering teams working out in the open, the level of contribution they actually see from the open source community into their project is more than tenfold what the actual number of people they have working in the open is.</p>
        <p>So, if you want to be successful, if you want to have an open source strategy that works, you really need to be part of your community. Don&#8217;t just publish something over the wall to the community. Be part of it. And again, I&#8217;m a long-term open source advocate. So, the most reassuring thing for me about what we see with these large projects is it&#8217;s actually bringing new people into our open source community.</p>
        <p>It&#8217;s teaching a whole new group the skills that they need to learn to collaborate online and in open source. So, despite this, you know, some early skepticism, the data&#8217;s really showing us that these commercially back projects are bringing in more and more new people—and more and more new people into open. Rather than business killing open source, really, they&#8217;re increasing the wider communities exposure to it. </p>
        <p>Not only do we see the most successful companies investing in their communities, we&#8217;re also actually seeing them invest a lot more in what we call open source programs offices—OSPOs. They help advocate typically for the responsible use of open source inside a company. They also help the company invest in its open source dependencies. By our estimation, 30% now of Fortune 100 companies have a OSPO to help guide their open source strategy. </p>
        <p>And if you want to learn more, actually we&#8217;ve had some OSPO sessions at the conference this week. We&#8217;ve had a load of them online, so you can check those out. You can also dig into some community groups where many of them hang out, including the TODO Group—you can look them up. And InnerSource Commons is another cool group where these kind of OSPO people hang out. </p>
        <p>And I can say, you know, from my own personal kind of lived experience, while these companies are investing in open source, we actually see that investment in open source changes their internal culture too. We see more collaboration in those companies. We see them get less siloed. </p>
        <p>That leads me actually to my final conclusion you&#8217;d be glad to hear as I&#8217;m the thing that&#8217;s stopping the crew from going home. Open source and the open source community—it&#8217;s stronger than ever. We&#8217;re learning in the open—it&#8217;s here to stay. It&#8217;s clearly successful. We&#8217;ve got a long way to go. This global exchange of ideas that we&#8217;ve got though, it&#8217;s helping grow who we think of can be a developer, if that make sense. It&#8217;s helping grow what their background is, what they work on, where they live.</p>
        <p>It&#8217;s not hyperbole. In fact, you know, to say that—we saw this morning open source is advancing mankind. Like, it&#8217;s amazing. So, in the past year alone, in fact, more than 20 million people from across the whole world have joined GitHub. 20 million just last year. Over 227 million pull requests were merged, in fact. And over 31 million issues closed. </p>
        <p>That&#8217;s a lot of work. And that&#8217;s not all just code contribution. That&#8217;s reporting bugs, that&#8217;s finding defects. Sorry—finding defects. There you go. That&#8217;s doing work and it&#8217;s really kind ofhelping all these people work in the open, and that work in the open is now available for all of us to learn from—the entire world to learn from, to improve, and to contribute back. </p>
        <p>The pace of activity in the developer community—we just keep seeing it accelerating. Last year we saw over 413 million contributions made to the open source projects on GitHub. I know yeah—go on then. Woo! Hey, sorry it wasn&#8217;t me. It was you anyway. </p>
        <p>The future&#8217;s really bright when it comes to like our pace of technical advancement. Our advancement just continues to accelerate. So, looking at this year&#8217;s Octoverse report, my three big takeaways—apart from krill research is fascinating. My personal takeaways: as a fan of DevOps, it&#8217;s just been wonderful to see this, this infrastructure-as-code community growing. It means more and more people are coming to open source, and we are sharing those best practices with other people to get them to learn and to understand.</p>
        <p>While it&#8217;s great to welcome big tech into open source, it’s also really encouraging to me personally that it means more and more people secretly getting exposed to open source contribution for the first time. So, that&#8217;s awesome. And then you know, from GitHub, it&#8217;s a real privilege to be part of the growth of this open source community as a whole.</p>
        <p>But don&#8217;t just take my word for it. If you want to take a look yourself, you can download the Octoverse report now. It&#8217;s on the website. Please share with yourself—not yourself, share with me. Sorry. What your conclusions are. I’d love to hear about it. We make all the data available so you can go take a look and tell us what you think our conclusions are.</p>
        <p>You can reach me @martinwoodward on GitHub and on social. Um, yeah, so it&#8217;s been my honor to celebrate 10 years of Octoverse with you here today. And it&#8217;s also my honor to close out Universe with you here today. Wherever you&#8217;re joining us in the world, wherever you are, I hope you had a fantastic conference.</p>
        <p>So, I want to thank you for, uh, spending your time with us this week. Thanks for listening to me jabber on. Thanks for listening to his last session. And most importantly, thanks for helping change the world one pull request at a time. Thank you.</p>
        </details>
        ]]></content:encoded>
                  
            
            
            <post-id xmlns="com-wordpress:feed-additions:1">69175</post-id>	</item>
            <item>
            <title>Release Radar · November 2022 Edition</title>
            <link>https://github.blog/2022-12-16-release-radar-nov-2022/</link>
            
            <dc:creator><![CDATA[Michelle Mannering]]></dc:creator>
            <pubDate>Fri, 16 Dec 2022 19:00:22 +0000</pubDate>
                <category><![CDATA[Community]]></category>
            <category><![CDATA[Open Source]]></category>
            <category><![CDATA[CLI]]></category>
            <category><![CDATA[Dependabot]]></category>
            <category><![CDATA[GitHub Actions]]></category>
            <category><![CDATA[GitHub Marketplace]]></category>
            <category><![CDATA[GitHub Pages]]></category>
            <category><![CDATA[javascript]]></category>
            <category><![CDATA[Node.js]]></category>
            <category><![CDATA[PHP]]></category>
            <category><![CDATA[React]]></category>
            <category><![CDATA[Vue.js]]></category>
            <guid isPermaLink="false">https://github.blog/?p=68919</guid>
        
                  <description><![CDATA[We promised we&#8217;d be back soon and here we are! There has been an incredible amount of open source projects shipping major version releases before the year wraps up. I can&#8217;t believe we are all saying that now. &#8220;When the year wraps up!&#8221; or &#8220;See you next year!&#8221; What happened to 2022? Well, we know [&#8230;]]]></description>
                            <content:encoded><![CDATA[<p>We promised we&#8217;d be back soon and here we are! There has been an incredible amount of open source projects shipping major version releases before the year wraps up. I can&#8217;t believe we are all saying that now. &#8220;When the year wraps up!&#8221; or &#8220;See you next year!&#8221; What happened to 2022? Well, we know the open source community was working hard all through this past year. If you don&#8217;t know what I&#8217;m talking about, check out the <a href="https://github.blog/2022-11-17-octoverse-2022-10-years-of-tracking-open-source/" target="_blank" rel="noopener">State of the Octoverse report</a>. And with that, let&#8217;s read up on this month&#8217;s Release Radar with projects that shipped major version updates this November.</p>
        <h2 id="cli-for-microsoft-365-6-0">CLI for Microsoft 365 6.0<a href="#cli-for-microsoft-365-6-0" class="heading-link pl-2 text-italic text-bold" aria-label="CLI for Microsoft 365 6.0"></a></h2>
        <p>As a Microsoft fan-girl, this is one of my favourites. You can manage all your Microsoft 365 tenant and SharePoint Frameworks. It doesn&#8217;t matter if you&#8217;re using Windows, macOS, Linux, Bash, or PowerShell. <a href="https://github.com/pnp/cli-microsoft365" target="_blank" rel="noopener">CLI for Microsoft 365</a> also allows you to build automation scripts. The latest update includes extended documentation with new commands for all your favourite Microsoft apps. There&#8217;s also new ways to configure how you want to display commands, and extended support for managing Power Platform. Check out all the changes in the <a href="https://pnp.github.io/cli-microsoft365/about/release-notes/#" target="_blank" rel="noopener">release notes</a>. Did you notice the website is powered by <a href="https://github.blog/2022-08-10-github-pages-now-uses-actions-by-default/" target="_blank" rel="noopener">GitHub Pages</a> <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f609.png" alt="😉" class="wp-smiley" style="height: 1em; max-height: 1em;" />. Also congrats to CLI for Microsoft 365 for celebrating their fifth birthday <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f382.png" alt="🎂" class="wp-smiley" style="height: 1em; max-height: 1em;" /><img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f973.png" alt="🥳" class="wp-smiley" style="height: 1em; max-height: 1em;" />.</p>
        <p><img decoding="async" loading="lazy" class="alignnone size-full wp-image-69162 width-fit" src="https://github.blog/wp-content/uploads/2022/12/cli-microsoft365.gif?resize=1020%2C573" alt="" width="1020" height="573" data-recalc-dims="1" /></p>
        <h2 id="react95-4-0">React95 4.0<a href="#react95-4-0" class="heading-link pl-2 text-italic text-bold" aria-label="React95 4.0"></a></h2>
        <p>More Microsoft fan-girling! I grew up in the days of Windows 95 and Clippy so this hits home nicely. <a href="https://react95.io/" target="_blank" rel="noopener">React95</a> is a Windows 95 style UI component library for React. It gives you all the vibes and nostalgia from the &#8217;90s. Version 4.0 has been completely written in TypeScript, and there&#8217;s a cool new Storybook theme. Check out all the changes in the <a href="https://github.com/react95-io/React95/releases/tag/v4.0.0" target="_blank" rel="noopener">release notes</a> and try it out to relive your childhood.</p>
        <p><img decoding="async" loading="lazy" class="alignnone size-full wp-image-69149 width-fit" src="https://github.blog/wp-content/uploads/2022/12/201535179-fb8a9526-0ef4-4c81-8934-3dcd25447eb5.png?resize=1024%2C529" alt="" width="1024" height="529" srcset="https://github.blog/wp-content/uploads/2022/12/201535179-fb8a9526-0ef4-4c81-8934-3dcd25447eb5.png?resize=1024%2C529?w=1300 1300w, https://github.blog/wp-content/uploads/2022/12/201535179-fb8a9526-0ef4-4c81-8934-3dcd25447eb5.png?resize=1024%2C529?w=300 300w, https://github.blog/wp-content/uploads/2022/12/201535179-fb8a9526-0ef4-4c81-8934-3dcd25447eb5.png?resize=1024%2C529?w=768 768w, https://github.blog/wp-content/uploads/2022/12/201535179-fb8a9526-0ef4-4c81-8934-3dcd25447eb5.png?resize=1024%2C529?w=1024 1024w, https://github.blog/wp-content/uploads/2022/12/201535179-fb8a9526-0ef4-4c81-8934-3dcd25447eb5.png?resize=1024%2C529?w=804 804w" sizes="(max-width: 1000px) 100vw, 1000px" data-recalc-dims="1" /></p>
        <h2 id="react-pdf-6-0">React-PDF 6.0<a href="#react-pdf-6-0" class="heading-link pl-2 text-italic text-bold" aria-label="React-PDF 6.0"></a></h2>
        <p>Bit of a React theme this month too. <a href="https://projekty.wojtekmaj.pl/react-pdf/" target="_blank" rel="noopener">React-PDF</a> is a React library that easily renders and displays PDFs in React applications. The latest update brings the highly anticipated Vite support. There&#8217;s modern JavaScript by default, and support for Internet Explorer 11 has ended. Check out the <a href="https://github.com/wojtekmaj/react-pdf/releases/tag/v6.0.0" target="_blank" rel="noopener">release notes</a> for all the changes. The team have also put together a <a href="https://github.com/wojtekmaj/react-pdf/wiki/Upgrade-guide-from-version-5.x-to-6.x" target="_blank" rel="noopener">handy migration guide</a>.</p>
        <h2 id="box-cli-maker-2-0">Box CLI Maker 2.0<a href="#box-cli-maker-2-0" class="heading-link pl-2 text-italic text-bold" aria-label="Box CLI Maker 2.0"></a></h2>
        <p>We&#8217;ve got some Microsoft, React, and now CLI themes running through this Release Radar. <a href="https://pkg.go.dev/github.com/Delta456/box-cli-maker/v2" target="_blank" rel="noopener">Box CLI Maker</a> is another CLI tool, but this one allows you to make customisable terminal boxes. There are eight built in styles, 16 built in colours and true colour support. The latest version includes custom colour support, optimised code, and added support for the Windows Console<span style="font-weight: 400;">—</span>hooray for the Microsoft fan-girl in the room! Check out all the changes in the <a href="https://github.com/Delta456/box-cli-maker/releases/tag/v2.0.0" target="_blank" rel="noopener">changelog</a>, and remember to update to get all the new features.</p>
        <h2 id="chart-js-4-0">Chart.js 4.0<a href="#chart-js-4-0" class="heading-link pl-2 text-italic text-bold" aria-label="Chart.js 4.0"></a></h2>
        <p>For those JavaScript users out there, this one for you. Chart.js is a flexible, lightweight charting tool for designers and developers. It started in 2013, and has over 50,000 stars on GitHub <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f62e.png" alt="😮" class="wp-smiley" style="height: 1em; max-height: 1em;" />. It&#8217;s highly customisable, and comes with lots of default configurations, making it a lot easier to start. The new version has lots of updates, fixes, documentation changes, and more. Check them out in the <a href="https://github.com/chartjs/Chart.js/releases/tag/v4.0.0-release" target="_blank" rel="noopener">release notes</a>, along with a migration guide.</p>
        <h2 id="nuxt-3-0">Nuxt 3.0<a href="#nuxt-3-0" class="heading-link pl-2 text-italic text-bold" aria-label="Nuxt 3.0"></a></h2>
        <p>You might recognise the green Vue.js colour palette when you take a look at <a href="https://github.com/nuxt/framework" target="_blank" rel="noopener">Nuxt</a>. That&#8217;s because it&#8217;s an intuitive Vue Framework, providing developers with a better user experience. It&#8217;s fast, and uses on demand rendering to help build projects. The latest version is a modern rewrite of the full Nuxt framework. Based on Vite, Vue3, and Nitro, it now includes TypeScript support. There is a stable, production ready API, browser support, and support for Node.js 14, 16, 18, and 19. Check out all the changes on the <a href="https://nuxt.com/v3" target="_blank" rel="noopener">website</a>, and keep in touch with the community on the <a href="https://github.com/nuxt/framework/discussions" target="_blank" rel="noopener">Nuxt GitHub Discussions</a>.</p>
        <figure id="attachment_69169"  class="wp-caption alignnone mx-0"><img decoding="async" loading="lazy" class="width-fit width-fit wp-image-69169 size-full" src="https://github.blog/wp-content/uploads/2022/12/SkylineNuxt7.gif" alt="" /><figcaption class="text-mono color-fg-muted mt-14px f5-mktg">The <a href="https://skyline.github.com" target="_blank" rel="noopener">GitHub Skyline</a> website is built with Nuxt.</figcaption></figure>
        <h2 id="stable-diffusion-2-0">Stable Diffusion 2.0<a href="#stable-diffusion-2-0" class="heading-link pl-2 text-italic text-bold" aria-label="Stable Diffusion 2.0"></a></h2>
        <p>We promised you AI in the last Release Radar and we&#8217;re delivering. In the <a href="https://github.blog/2022-12-09-release-radar-october-2022/" target="_blank" rel="noopener">October Release Radar</a>, we talked about InvokeAI as a stable diffusion project. Now, <a href="https://github.com/Stability-AI/stablediffusion" target="_blank" rel="noopener">Stable Diffusion</a> 2.0 has been released. These are models trained to use AI in the creation and modification of artwork. If you were at <a href="https://github.blog/2022-10-05-two-ways-you-can-experience-github-universe/" target="_blank" rel="noopener">GitHub Universe</a>, you would have seen Stable Diffusion in use at the AI art studio. This <a href="https://stability.ai/blog/stable-diffusion-v2-release" target="_blank" rel="noopener">latest version</a> includes better text to image models, and a new next encoder. If you haven&#8217;t come across any AI art yet, we encourage you to try it out.</p>
        <figure id="attachment_69148"  class="wp-caption alignnone mx-0"><img decoding="async" loading="lazy" class="width-fit size-full wp-image-69148 width-fit" src="https://github.blog/wp-content/uploads/2022/12/202283925-90b23fd3-15d6-40c6-a726-219f3cd00eb8.gif" alt="" /><figcaption class="text-mono color-fg-muted mt-14px f5-mktg">Artwork made with Stable Diffusion at GitHub Universe.</figcaption></figure>
        <h2 id="tesseract-js-4-0">Tesseract.js 4.0<a href="#tesseract-js-4-0" class="heading-link pl-2 text-italic text-bold" aria-label="Tesseract.js 4.0"></a></h2>
        <p>With all the text to image tooling around AI artwork, it would be amiss of us not to mention image to text recognition. <a href="http://tesseract.projectnaptha.com/" target="_blank" rel="noopener">Tesseract.js</a> is a JavaScript library that can analyse an image of text and extract that text in almost any language. This includes <a href="https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016" target="_blank" rel="noopener">dozens of spoken languages</a>. The latest version comes with lots of breaking changes, including preprocessing options for rotating images for better accuracy. Processed images can also be retrieved. For example, if an image has been rotated, or it&#8217;s in greyscale, they can now be analysed. Check out <a href="https://github.com/naptha/tesseract.js/releases/tag/v4.0.0" target="_blank" rel="noopener">the changelog</a> for all the updates.</p>
        <p><img decoding="async" loading="lazy" class="alignnone size-full wp-image-69163 width-fit" src="https://github.blog/wp-content/uploads/2022/12/demo.gif?resize=1024%2C242" alt="" width="1024" height="242" data-recalc-dims="1" /></p>
        <h2 id="dependabot-changelog-helper-2-0">Dependabot Changelog Helper 2.0<a href="#dependabot-changelog-helper-2-0" class="heading-link pl-2 text-italic text-bold" aria-label="Dependabot Changelog Helper 2.0"></a></h2>
        <p><a href="https://github.blog/2022-10-20-improving-navigation-for-github-actions/" target="_blank" rel="noopener">GitHub Actions</a> is now one of the biggest CI/CD tools, allowing users to discover, create, and share actions to perform any job. There are thousands of GitHub Actions on the <a href="https://github.com/marketplace?type=actions&amp;query=" target="_blank" rel="noopener">GitHub Marketplace</a>. One such action is <a href="https://github.com/dangoslen/dependabot-changelog-helper" target="_blank" rel="noopener">Dependabot Changelog Helper</a>. Developers love <a href="https://github.blog/changelog/2022-12-13-dependabot-hardens-support-for-private-registries" target="_blank" rel="noopener">Dependabot</a>, and this action automatically updates your changelog with the relevant Dependabot package updates. The latest update makes a fundamental change to the action where it looks for new and unreleased versions of your dependencies. Check out the action on <a href="https://github.com/marketplace/actions/dependabot-changelog-helper" target="_blank" rel="noopener">GitHub Marketplace</a> and add it to your next project.</p>
        <h2 id="revolt-1-0">Revolt 1.0<a href="#revolt-1-0" class="heading-link pl-2 text-italic text-bold" aria-label="Revolt 1.0"></a></h2>
        <p>PHP is currently one of the most popular languages on GitHub. With so many PHP applications out there, developers need a way to manage concurrent PHP apps. <a href="https://github.com/revoltphp/event-loop" target="_blank" rel="noopener">Revolt</a> is an event loop to help manage multitasking. This means when a database is queried, instead of waiting for a single response, the application should (in theory) be able to handle multiple requests at once. <a href="https://revolt.run" target="_blank" rel="noopener">Revolt</a> helps this occur. Congratulations to the team on shipping your first major<span style="font-weight: 400;">—</span>stable<span style="font-weight: 400;">—</span>release <img src="https://s.w.org/images/core/emoji/14.0.0/72x72/1f973.png" alt="🥳" class="wp-smiley" style="height: 1em; max-height: 1em;" />.</p>
        <h2 id="release-radar-november">Release Radar November<a href="#release-radar-november" class="heading-link pl-2 text-italic text-bold" aria-label="Release Radar November"></a></h2>
        <p>Well, that’s all for this month’s top release picks. Congratulations to everyone who shipped a new release, whether it was version 1.0 or version 6.0. Good luck to all those who are packaging up their projects and pushing major version updates before the end of 2022.</p>
        <p>If you missed our last Release Radar, check out the amazing open source projects that released major version projects from <a href="https://github.blog/2022-10-28-release-radar-sept-2022/" target="_blank" rel="noopener">October</a>. We love featuring projects submitted by the community. If you are working on an open source project and shipping a major version soon, we&#8217;d love to hear from you. Check out our new <a href="https://releaseradar.github.com/" target="_blank" rel="noopener">Release Radar repository</a>, and <a href="https://github.com/github/release-radar/issues/new?assignees=MishManners&amp;labels=&amp;template=release-radar-request.yml&amp;title=%5BRelease+Radar+Request%5D+%3Ctitle%3E" target="_blank" rel="noopener">submit your project to be featured in the GitHub Release Radar</a>.</p>
        ]]></content:encoded>
                  
            
            
            <post-id xmlns="com-wordpress:feed-additions:1">68919</post-id>	</item>
            <item>
            <title>Leaked a secret? Check your GitHub alerts&#8230;for free</title>
            <link>https://github.blog/2022-12-15-leaked-a-secret-check-your-github-alerts-for-free/</link>
            
            <dc:creator><![CDATA[Mariam Sulakian]]></dc:creator>
            <pubDate>Thu, 15 Dec 2022 17:00:52 +0000</pubDate>
                <category><![CDATA[Community]]></category>
            <category><![CDATA[Security]]></category>
            <category><![CDATA[application security]]></category>
            <category><![CDATA[Secret Scanning]]></category>
            <guid isPermaLink="false">https://github.blog/?p=69128</guid>
        
                  <description><![CDATA[GitHub now allows you to track any leaked secrets in your public repository, for free. With secret scanning alerts, you can track and action on leaked secrets directly within GitHub.]]></description>
                            <content:encoded><![CDATA[<p>Exposed secrets and credentials are the most common cause of data breaches and often go untracked.<sup id="fnref-69128-1"><a href="#fn-69128-1" class="jetpack-footnote" title="Read footnote.">1</a></sup> With an average of 327 days to identify, these data beaches have shown that credential leaks can lead to severe consequences. Still, organizations struggle to detect leaks at scale and take prompt action to fix any exposed secrets.</p>
        <p>At GitHub, we partner with service providers to flag leaked credentials on all public repositories through our <a href="https://docs.github.com/en/developers/overview/secret-scanning-partner-program">secret scanning partner program</a>. We scan repositories for 200+ token formats and work with relevant partners to help protect our mutual customers. In 2022, we notified our partners of over 1.7 million potential secrets exposed in public repositories to prevent the misuse of those tokens.</p>
        <p><strong>Today, we&#8217;re starting to roll out secret scanning to all free public repositories in the GitHub community, for free.</strong></p>
        <p>Secret scanning alerts notify you directly about leaked secrets in your code. We&#8217;ll still notify our partners for your fastest protection, but now you can own the holistic security of your repositories. You’ll also receive alerts for secrets where it’s not possible to notify a partner—for example, if the keys to your self-hosted HashiCorp Vault are exposed. You’ll always have easy tracking across all alerts to drill deeper into the leak’s source and audit actions taken on the alert.</p>
        <p class="purple-text text-gradient-purple-coral mt-6 mb-6">By using secret scanning alerts in your public repositories, you can help prevent secret exposures and build on open source with confidence.</p>
        <figure class="gh-full-blockquote mx-0 pl-6 mt-6 mt-md-7 mb-7 mb-md-8"><blockquote><p>With secret scanning we found a ton of important things to address. On the AppSec side, it’s often the best way for us to get visibility into issues in the code.</p></blockquote><figcaption class="text-mono color-fg-muted f5-mktg mt-3"> - David Ross, Staff Security Engineer, Postmates</figcaption></figure>
        <h3 id="how-to-get-started">How to get started<a href="#how-to-get-started" class="heading-link pl-2 text-italic text-bold" aria-label="How to get started"></a></h3>
        <p>We’ll begin our gradual public beta rollout of secret scanning for public repositories today and expect all users to have the feature by the end of January 2023. If you want earlier access, or have any questions or feedback, please submit a request in our <a href="https://github.com/orgs/community/discussions/categories/code-security">code security discussion</a>.</p>
        <p>Once secret scanning alerts are available on your repository you can enable them in your repository’s settings under “Code security and analysis” settings. You can see any detected secrets by navigating to the “Security” tab of your repository and selecting “Secret scanning” in the side panel underneath “Vulnerability alerts.” There, you will see a list of any detected secrets, and you can click on any alert to reveal the compromised secret, its location, and suggested action for remediation.</p>
        <div class="image-frame image-frame-full border rounded-2 overflow-hidden d-flex flex-row flex-justify-center" style="background: #EAEEF2"><br />
        <img decoding="async" src="https://github.blog/wp-content/uploads/2022/12/207135136-ac42e490-041b-444b-b809-b0a196a4c3dc.gif" alt="Gif demonstrating how to interact with secret scanning in your repository." /><br /></div>
        <p>You can find more information on how to enable secret scanning alerts for your repository in our <a href="https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning">documentation</a>.</p>
        <h3 id="become-a-github-secret-scanning-partner">Become a GitHub secret scanning partner<a href="#become-a-github-secret-scanning-partner" class="heading-link pl-2 text-italic text-bold" aria-label="Become a GitHub secret scanning partner"></a></h3>
        <p>If you’re a service provider and interested in protecting our shared users from leaking secrets, we encourage you to join the <a href="https://docs.github.com/en/developers/overview/secret-scanning-partner-program">secret scanning partner program</a>. We currently support 200+ patterns and 100+ <a href="https://docs.github.com/en/code-security/secret-scanning/secret-scanning-patterns#supported-secrets-for-partner-patterns">partners. </a>To get started, please email <a href="mailto:secret-scanning@github.com">secret-scanning@github.com</a>.</p>
        <p><!-- Footnotes themselves at the bottom. --></p>
        <div class="footnotes">
        <hr />
        <ol>
        <li id="fn-69128-1">
        IBM “Cost of a Data Breach 2022” https://www.ibm.com/reports/data-breach&#160;<a href="#fnref-69128-1" title="Return to main content.">&#8617;</a>
        </li>
        </ol>
        </div>
        ]]></content:encoded>
                  
            
            
            <post-id xmlns="com-wordpress:feed-additions:1">69128</post-id>	</item>
            <item>
            <title>GitHub Advanced Security customers can now push protect their custom patterns</title>
            <link>https://github.blog/2022-12-15-github-advanced-security-customers-can-now-push-protect-their-custom-patterns/</link>
            
            <dc:creator><![CDATA[Mariam Sulakian]]></dc:creator>
            <pubDate>Thu, 15 Dec 2022 17:00:38 +0000</pubDate>
                <category><![CDATA[Enterprise]]></category>
            <category><![CDATA[Security]]></category>
            <category><![CDATA[application security]]></category>
            <category><![CDATA[Secret Scanning]]></category>
            <guid isPermaLink="false">https://github.blog/?p=69126</guid>
        
                  <description><![CDATA[With just one click, admins in GitHub Advanced Security organizations can protect their custom patterns on push.]]></description>
                            <content:encoded><![CDATA[<p>The most successful application security initiatives help developers work more efficiently. You need to know when vulnerabilities exist in code so that you can fix them. But what if you could prevent those vulnerabilities in the first place?</p>
        <p>With GitHub Advanced Security, organizations use <a href="https://docs.github.com/en/enterprise-cloud@latest/code-security/secret-scanning/protecting-pushes-with-secret-scanning">push protection</a> to prevent secret leaks and save hundreds of hours in downstream remediation time. Push protection has already prevented more than 8,000 secret leaks across 100 secret types since its initial release in April.</p>
        <p><strong>Now, organizations that have defined <a href="https://docs.github.com/en/enterprise-cloud@latest/code-security/secret-scanning/defining-custom-patterns-for-secret-scanning">custom patterns </a>can enable push protection for those patterns</strong>. Push protection for custom patterns can be configured on a pattern-by-pattern basis. So, just like how you can already choose which patterns to publish (and which to first refine in draft mode), you can decide which patterns to push protect based on false positives.</p>
        <figure class="gh-full-blockquote mx-0 pl-6 mt-6 mt-md-7 mb-7 mb-md-8"><blockquote><p>If I attempt to push a secret, I immediately know it. GitHub’s secret scanning push protection stops me before a secret is pushed into the code base, saving me tons of time. If, instead, I rely solely on external scanning tools to scan the repository after the secret’s already been exposed, I’ll need to quickly revoke the secret and refactor my code. The integration of GitHub’s secret scanning and push protection directly in a developer’s flow saves time and helps educate developers on best practices.</p></blockquote><figcaption class="text-mono color-fg-muted f5-mktg mt-3"> - David Florey, Software Engineering Director, Intel</figcaption></figure>
        <h2 id="enabling-push-protection">Enabling push protection<a href="#enabling-push-protection" class="heading-link pl-2 text-italic text-bold" aria-label="Enabling push protection"></a></h2>
        <p>You can define custom patterns at the repository, organization, and enterprise levels. And now, you can also enable push protection for custom patterns at the organization or repository level. With push protection enabled, GitHub will enforce blocks when contributors try to push code that contains matches to the defined pattern.</p>
        <p>To <a href="https://docs.github.com/en/enterprise-cloud@latest/code-security/secret-scanning/defining-custom-patterns-for-secret-scanning#defining-a-custom-pattern-for-a-repository">define a custom pattern</a>, navigate to your organization’s code security settings page. Once you have GitHub Advanced Security and secret scanning enabled, you can create a new custom pattern through the UI. We allow you to dry run any custom pattern—before you publish.</p>
        <p>Once you publish your pattern, and feel confident that the pattern creates alerts with low false positives, you can click “Enable” besides “Push protection” in your custom pattern’s page. GitHub recommends regularly checking your custom pattern’s alerts to make sure that you’re keeping false positive noise as low as possible for your developers. This strategic use of push protection can help you build trust between your contributors and their security alerts, so that alerts are properly actioned when needed.</p>
        <div class="image-frame image-frame-full border rounded-2 overflow-hidden d-flex flex-row flex-justify-center" style="background: #EAEEF2"><br />
        <img decoding="async" src="https://github.blog/wp-content/uploads/2022/12/207156043-ca0e90ea-e7fb-413e-a3a7-53ed9192e60c.gif" alt="Gif demonstrating how to set up custom pattern push protection based on the user&#039;s private key." /><br /></div>
        <h3 id="learn-more-about-secret-scanning">Learn more about secret scanning<a href="#learn-more-about-secret-scanning" class="heading-link pl-2 text-italic text-bold" aria-label="Learn more about secret scanning"></a></h3>
        <p>Secret scanning alerts are available for free for all public repositories. We provide push protection as well as coverage for private repositories as part of GitHub Advanced Security, which also includes code scanning and supply chain security insights. To try <a href="https://github.com/features/security">GitHub Advanced Security</a> in your organization or see a demo, please reach out to your <a href="https://github.com/enterprise/contact?utm_source=github&#038;utm_medium=site&#038;utm_campaign=adv-security&#038;ref_page=/features/security&#038;ref_cta=Contact%20Sales&#038;ref_loc=hero">GitHub sales partner</a>.</p>
        <h3 id="become-a-github-secret-scanning-partner">Become a GitHub secret scanning partner<a href="#become-a-github-secret-scanning-partner" class="heading-link pl-2 text-italic text-bold" aria-label="Become a GitHub secret scanning partner"></a></h3>
        <p>If you’re a service provider and interested in protecting our shared users from leaking secrets, we encourage you to join the secret scanning partner program. We currently support 200+ patterns and 100+ <a href="https://docs.github.com/en/code-security/secret-scanning/secret-scanning-patterns#supported-secrets-for-partner-patterns">partners</a>. To get started, please email <a href="mailto:secret-scanning@github.com">secret-scanning@github.com</a>.</p>
        ]]></content:encoded>
                  
            
            
            <post-id xmlns="com-wordpress:feed-additions:1">69126</post-id>	</item>
            <item>
            <title>Raising the bar for software security: next steps for GitHub.com 2FA</title>
            <link>https://github.blog/2022-12-14-raising-the-bar-for-software-security-next-steps-for-github-com-2fa/</link>
            
            <dc:creator><![CDATA[John Swanson]]></dc:creator>
            <pubDate>Wed, 14 Dec 2022 17:00:15 +0000</pubDate>
                <category><![CDATA[Security]]></category>
            <category><![CDATA[2FA]]></category>
            <guid isPermaLink="false">https://github.blog/?p=69113</guid>
        
                  <description><![CDATA[GitHub will require all users who contribute code on GitHub.com to enable one or more forms of two-factor authentication (2FA) by the end of 2023. Learn more about our approach, when we’ll begin our rollout, and what you can expect as we begin requiring 2FA.]]></description>
                            <content:encoded><![CDATA[<p>GitHub is committed to raising the bar for the security of the <a href="https://github.blog/2022-03-28-how-to-secure-your-end-to-end-supply-chain-on-github/">software development ecosystem</a>, and that starts with the developer. We continue to improve the <a href="https://github.blog/changelog/2022-07-26-general-availability-of-improved-2fa-experience-in-npm/">npm 2FA experience</a>, and now <a href="https://github.blog/changelog/2022-11-01-high-impact-package-maintainers-now-require-2fa/">require maintainers of packages</a> with more than 1 million weekly downloads or more than 500 dependents to enable 2FA. To better protect developers from account theft, we <a href="https://github.blog/2022-05-04-software-security-starts-with-the-developer-securing-developer-accounts-with-2fa/#get-started-today">announced</a> our intention to require all developers who contribute code on GitHub.com to enable one or more forms of 2FA by the end of 2023. Read on to learn more about how GitHub is approaching this challenge, and what you can expect as we begin requiring 2FA in March 2023.</p>
        <h2 id="the-challenge-and-how-were-approaching-it">The challenge and how we’re approaching it<a href="#the-challenge-and-how-were-approaching-it" class="heading-link pl-2 text-italic text-bold" aria-label="The challenge and how we’re approaching it"></a></h2>
        <p>Millions of developers on GitHub.com will be required to enable 2FA during 2023. We want to meet this challenge while also providing a positive experience for developers. To do so, we’ll gradually roll out the 2FA requirement to users over the course of 2023.</p>
        <p>Beginning in March 2023, we’ll start requiring distinct groups of users to enable 2FA over time. This will allow us to learn about the efficacy of the rollout and make adjustments as needed before we scale to larger groups as 2023 progresses.</p>
        <p>While GitHub won’t be providing specifics regarding how users qualify for these groups or which group a specific user will fall into, these groups are built from the following criteria with an emphasis on impact to security of the broader ecosystem:</p>
        <ul>
        <li>Users who published GitHub or OAuth apps or <a href="https://docs.github.com/en/packages/learn-github-packages/publishing-a-package">packages</a> </li>
        <li>Users who created a <a href="https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases">release</a></li>
        <li>Users who are Enterprise and Organization administrators</li>
        <li>Users who contributed code to repositories deemed critical by <a href="https://github.blog/2021-11-15-githubs-commitment-to-npm-ecosystem-security/#automated-malware-detection-and-requiring-2fa-to-combat-maintainer-account-takeovers">npm</a>, <a href="https://github.com/ossf/criticality_score">OpenSSF</a>, <a href="https://pypi.org/security-key-giveaway/">PyPI</a>, or <a href="https://blog.rubygems.org/2022/08/15/requiring-mfa-on-popular-gems.html">RubyGems</a></li>
        <li>Users who contributed code to the approximate top four million public and private repositories</li>
        </ul>
        <p>At GitHub, we <code>ship to learn</code> and <code>ship and iterate</code> to help us optimize for successful user experiences. Accordingly, we’ll assess the outcomes of the rollout after each group–observing user success rates for 2FA onboarding, rates of account lockout and recovery, and our support ticket volume. This data will enable us to adjust our approach and more appropriately size and schedule remaining groups as needed to ensure a positive experience for developers, and support workloads GitHub can sustain.</p>
        <h2 id="what-to-expect-if-you-are-required-to-enable-2fa">What to expect if you are required to enable 2FA<a href="#what-to-expect-if-you-are-required-to-enable-2fa" class="heading-link pl-2 text-italic text-bold" aria-label="What to expect if you are required to enable 2FA"></a></h2>
        <p>GitHub has designed a rollout process intended to both minimize unexpected interruptions and productivity loss for users and prevent account lockouts.</p>
        <p><img decoding="async" loading="lazy" src="https://github.blog/wp-content/uploads/2022/12/2fa-copy-image.png?w=1024&#038;resize=1024%2C524" alt="Timeline showing the steps for 2FA rollout." width="1024" height="524" class="aligncenter size-large wp-image-69118 width-fit" srcset="https://github.blog/wp-content/uploads/2022/12/2fa-copy-image.png?w=2048 2048w, https://github.blog/wp-content/uploads/2022/12/2fa-copy-image.png?w=300 300w, https://github.blog/wp-content/uploads/2022/12/2fa-copy-image.png?w=768 768w, https://github.blog/wp-content/uploads/2022/12/2fa-copy-image.png?w=1024&#038;resize=1024%2C524 1024w, https://github.blog/wp-content/uploads/2022/12/2fa-copy-image.png?w=1536 1536w" sizes="(max-width: 1000px) 100vw, 1000px" data-recalc-dims="1" /></p>
        <h3 id="1-if-you-are-selected-for-a-pending-2fa-enablement-group">1. If you are selected for a pending 2FA enablement group,<a href="#1-if-you-are-selected-for-a-pending-2fa-enablement-group" class="heading-link pl-2 text-italic text-bold" aria-label="1. If you are selected for a pending 2FA enablement group,"></a></h3>
        <p>you will receive advance notification by email informing you of your deadline to enable 2FA and providing guidance on how to do so. This notification will occur approximately 45 days before the deadline.</p>
        <details>
        <summary>More details</summary>
        <ul>
        <li>When your group timeline begins, you will also begin receiving regular reminders of the pending deadline via announcement banners at the top of GitHub.com, which will guide you to the 2FA onboarding process.</li>
        <li>During your 45 day notification period, you’ll receive occasional emails notifying you of your pending 2FA enablement deadline.</li>
        </ul>
        </details>
        <h3 id="2-once-the-enablement-deadline-passes">2. Once the enablement deadline passes,<a href="#2-once-the-enablement-deadline-passes" class="heading-link pl-2 text-italic text-bold" aria-label="2. Once the enablement deadline passes,"></a></h3>
        <p>you will be prompted to enable 2FA the first time you access GitHub.com each day. You may snooze this prompt once a day for up to one week to provide you with flexibility, but after that week you will be unable to access GitHub.com features until you enable 2FA.</p>
        <details>
        <summary>More details</summary>
        <ul>
        <li>This one week snooze period only starts when you sign in after the deadline, so if you&#8217;re on vacation, don&#8217;t worry &#8211; you won&#8217;t come back locked out of GitHub.com.</li>
        </ul>
        </details>
        <h3 id="3-twenty-eight-28-days-after-you-enable-2fa">3. Twenty-eight (28) days after you enable 2FA,<a href="#3-twenty-eight-28-days-after-you-enable-2fa" class="heading-link pl-2 text-italic text-bold" aria-label="3. Twenty-eight (28) days after you enable 2FA,"></a></h3>
        <p>you will be presented with a 2FA check-up while using GitHub.com, which validates that your 2FA setup is working correctly. Previously signed in users will be able to reconfigure 2FA if they have misconfigured or misplaced second factors or recovery codes during onboarding.</p>
        <p>Any user that later qualifies for enablement will be enrolled in the process outlined above.</p>
        <h2 id="looking-forward">Looking Forward<a href="#looking-forward" class="heading-link pl-2 text-italic text-bold" aria-label="Looking Forward"></a></h2>
        <p>During the last six months, GitHub has been hard at work researching, planning, and <a href="https://github.blog/changelog/2022-11-21-updates-to-the-two-factor-authentication-setup-flow/">implementing improvements</a> to our 2FA onboarding and account lockout recovery processes. You can expect additional improvements and optimizations to the account lockout recovery experience in the first half of 2023. Finally, we’re hard at work to bring <a href="https://fidoalliance.org/passkeys/">passkey</a> support to GitHub.com to make strong authentication even easier to use. If you’d like to get a head start and enable 2FA today, more information is available in our <a href="https://github.blog/2022-05-04-software-security-starts-with-the-developer-securing-developer-accounts-with-2fa/#get-started-today">initial announcement</a>.</p>
        ]]></content:encoded>
                  
            
            
            <post-id xmlns="com-wordpress:feed-additions:1">69113</post-id>	</item>
          </channel>
        </rss>`
        )
      )
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("fetch_feed should return a list of items on a successful response", async () => {

  // Arrange & Act
  let elements = Array.prototype.slice.call(await utils.fetch_feed("https://github.blog/feed/"));

  // Assert
  expect(elements).toHaveLength(10);
});


test("fetch_feed should return null on an unsuccesful response", async () => {
  // Arrange
  server.use(
    rest.get(
      "https://github.blog/feed/",
      (req, res, ctx) => res(ctx.status(404))
    )
  );

  // Act & Assert
  expect(
    await utils.fetch_feed("https://github.blog/feed/")
  ).toBe(null)
});

test("fetch_feed should return null when no items are returned", async () => {
  // Arrange
  server.use(
    rest.get(
      "https://github.blog/feed",
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.xml(
            `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
            xmlns:content="http://purl.org/rss/1.0/modules/content/"
            xmlns:wfw="http://wellformedweb.org/CommentAPI/"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:atom="http://www.w3.org/2005/Atom"
            xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
            xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
            
            xmlns:georss="http://www.georss.org/georss"
            xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
            >
          
          <channel>
            <title>The GitHub Blog</title>
            <atom:link href="https://github.blog/feed/" rel="self" type="application/rss+xml" />
            <link>https://github.blog/</link>
            <description>Updates, ideas, and inspiration from GitHub to help developers build and design software.</description>
            <lastBuildDate>Wed, 21 Dec 2022 16:06:49 +0000</lastBuildDate>
            <language>en-US</language>
            <sy:updatePeriod>
            hourly	</sy:updatePeriod>
            <sy:updateFrequency>
            1	</sy:updateFrequency>
            <generator>https://wordpress.org/?v=6.1.1</generator>
          
          <image>
            <url>https://github.blog/wp-content/uploads/2019/01/cropped-github-favicon-512.png?fit=32%2C32</url>
            <title>The GitHub Blog</title>
            <link>https://github.blog/</link>
            <width>32</width>
            <height>32</height>
          </image> 
          <site xmlns="com-wordpress:feed-additions:1">153214340</site>	
            </channel>
          </rss>`
          )
        )
      })
  );

  // Act & Assert
  expect(
    await utils.fetch_feed("https://github.blog/feed/")
  ).toBe(null)
});

test("fetch_feed should return null when an invalid feed is parsed", async () => {
  // Arrange
  server.use(
    rest.get(
      "https://github.blog/feed",
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.xml(`
          <html>
            <head>
              <title>GitHub Blog</title>
            </head>
            <body>
              <h1>GitHub Blog</h1>
            </body>
          </html>
          `
          )
        )
      })
  );

  // Act & Assert
  expect(
    await utils.fetch_feed("https://github.blog/feed/")
  ).toBe(null)
});
