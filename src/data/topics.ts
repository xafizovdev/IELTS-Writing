export type Sample = {
  band: number;
  text: string;
};

export type Topic = {
  id: string;
  type: 'Task 1' | 'Task 2';
  title: string;
  prompt: string;
  imageUrl?: string;
  samples: Sample[];
  tips?: string[];
  category?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  stats?: {
    practiced: string;
    comments?: number;
    rating?: number;
  };
};

export const topics: Topic[] = [
  // ==========================================
  // TASK 1 (6 Topics)
  // ==========================================
  {
    id: 't1-1',
    type: 'Task 1',
    title: 'Bar Chart: Fast Food Consumption',
    prompt: 'The chart below shows the amount of money per week spent on fast foods in Britain. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800&h=400',
    tips: [
      'Start with an introduction that paraphrases the prompt.',
      'Write a clear overview highlighting the most significant trends.',
      'Group data logically in your body paragraphs.',
      'Use comparative language (e.g., "significantly higher than", "conversely").'
    ],
    samples: [
      {
        band: 8.5,
        text: 'The bar chart illustrates the weekly expenditure on three categories of fast food—hamburgers, fish and chips, and pizza—across three different income brackets in Britain in 1990.\n\nOverall, it is clear that higher-income earners spent the most on fast food, with hamburgers being the preferred choice for both high and average-income groups. In contrast, low-income earners spent the least overall and favored fish and chips.\n\nLooking at the details, individuals in the high-income bracket spent approximately 43 pence per person per week on hamburgers, which was substantially higher than their expenditure on fish and chips (around 17 pence) and pizza (roughly 19 pence). Average-income earners exhibited a similar preference pattern, spending about 33 pence weekly on hamburgers, followed by fish and chips at 25 pence and pizza at 12 pence.\n\nConversely, the low-income group demonstrated a distinctly different spending habit. Their highest expenditure was on fish and chips at roughly 17 pence per week. They spent considerably less on hamburgers (14 pence) and a mere 7 pence on pizza, making it the least popular option among this demographic.'
      }
    ]
  },
  {
    id: 't1-2',
    type: 'Task 1',
    title: 'Process Diagram: Brick Manufacturing',
    prompt: 'The diagram below shows the process by which bricks are manufactured for the building industry. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800&h=400',
    tips: [
      'Use the passive voice to describe the process (e.g., "the clay is dug", "the bricks are heated").',
      'Use sequencing words to connect the steps (e.g., "First", "Subsequently", "Following this").',
      'Ensure you mention every major stage shown in the diagram.'
    ],
    samples: [
      {
        band: 7.5,
        text: 'The diagram illustrates the various stages involved in the production of bricks for the building industry.\n\nOverall, the process consists of seven main steps, beginning with the excavation of clay and culminating in the delivery of the finished bricks to customers.\n\nFirst, clay is extracted from the ground using a large digger. This raw clay is then placed onto a metal grid, which filters out large chunks, and the refined clay falls onto a roller. In the next stage, sand and water are added to the clay to create a mixture. This mixture is then shaped into bricks either by using a wire cutter or by pressing it into specialized molds.\n\nFollowing the shaping process, the newly formed bricks are placed in a drying oven for 24 to 48 hours. Once dried, they undergo a two-stage firing process in a kiln. They are initially heated at a moderate temperature (200c - 980c) and then subjected to a high temperature (up to 1300c). After firing, the bricks are moved to a cooling chamber where they remain for 48 to 72 hours. Finally, the cooled bricks are packaged on pallets and loaded onto delivery trucks to be transported to their final destinations.'
      }
    ]
  },
  {
    id: 't1-3',
    type: 'Task 1',
    title: 'Line Graph: Car Ownership',
    prompt: 'The graph below shows changes in car ownership in Great Britain between 1971 and 2007. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
    imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800&h=400',
    tips: [
      'Identify the overall trend (e.g., an increase in multi-car households, a decrease in no-car households).',
      'Do not describe every single year; focus on the beginning, end, and major turning points.',
      'Use vocabulary for trends (e.g., "rose steadily", "declined sharply", "fluctuated").'
    ],
    samples: [
      {
        band: 8.0,
        text: 'The line graph delineates the shifting patterns of car ownership among households in Great Britain over a 36-year period, from 1971 to 2007.\n\nOverall, the most striking trend is the steady decline in the proportion of households without a car, contrasting with a significant rise in the percentage of households owning two or more vehicles. Meanwhile, the figure for single-car households remained relatively stable and consistently represented the largest group.\n\nIn 1971, nearly half of all British households (approximately 48%) did not own a car. However, this figure experienced a continuous and substantial decrease, dropping to roughly 25% by 2007. Conversely, the proportion of households with two cars saw a dramatic increase. Starting at a mere 7% in 1971, it climbed steadily to reach about 26% by the end of the period, slightly surpassing the percentage of car-less households.\n\nHouseholds with exactly one car constituted the majority throughout the timeframe. This group started at around 44% in 1971, experienced minor fluctuations, and ended slightly lower at approximately 43% in 2007. The percentage of households owning three or more cars remained the lowest, though it did see a marginal increase from roughly 1% to 5% over the three and a half decades.'
      }
    ]
  },
  {
    id: 't1-4',
    type: 'Task 1',
    title: 'Pie Chart: Energy Production',
    prompt: 'The pie charts compare the proportion of energy produced from different sources in a country in 1985 and 2003. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800&h=400',
    tips: [
      'Compare the two years directly rather than describing them separately.',
      'Highlight the biggest changes (increases and decreases).',
      'Use language of proportion (e.g., "a quarter", "the vast majority", "a small fraction").'
    ],
    samples: [
      {
        band: 7.5,
        text: 'The two pie charts illustrate the changes in the energy mix of a specific country between the years 1985 and 2003.\n\nOverall, the data reveals a significant shift away from oil towards nuclear power and natural gas as primary energy sources, although oil remained the largest single contributor in both years.\n\nIn 1985, oil dominated the energy sector, accounting for over half (52%) of the total production. However, by 2003, its share had decreased substantially to 39%. Similarly, the proportion of energy derived from coal experienced a decline, dropping from 8% in 1985 to 4% in 2003.\n\nConversely, the reliance on nuclear power saw a dramatic increase. It grew from a relatively modest 22% in 1985 to become the second-largest energy source at 28% in 2003. Natural gas also saw a notable rise, its share increasing from 13% to 23% over the 18-year period. Finally, the contribution of other renewable sources remained negligible, hovering around 4% to 5% in both years.'
      }
    ]
  },
  {
    id: 't1-5',
    type: 'Task 1',
    title: 'Map: Village Development',
    prompt: 'The maps show the development of the village of Ryemouth between 1995 and present. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800&h=400',
    tips: [
      'Use compass directions (north, south, east, west) to describe locations.',
      'Use passive voice and vocabulary of change (e.g., "was demolished", "was constructed", "was replaced by").',
      'Group your description logically, perhaps by looking at one side of the map first, then the other.'
    ],
    samples: [
      {
        band: 8.0,
        text: 'The two maps illustrate the significant infrastructural and residential changes that have taken place in the coastal village of Ryemouth from 1995 to the present day.\n\nOverall, Ryemouth has transformed from a quiet fishing village with extensive green spaces into a more developed residential and recreational area, characterized by the addition of new housing and sports facilities, and the removal of the fishing port.\n\nIn 1995, the area south of the main road running east to west featured a fishing port and a fish market by the sea. Presently, these have been completely demolished and replaced by a large block of apartments. Furthermore, the shops that were previously located north of the main road have been converted into restaurants.\n\nSignificant residential expansion has occurred. The housing estate in the north-west has been expanded with the construction of a new road and several new houses. Additionally, the large forest park situated in the east in 1995 has been cleared. In its place, a tennis court and a golf course have been constructed, catering to recreational needs. The hotel in the south-east remains, but it has been expanded to include a new car park.'
      }
    ]
  },
  {
    id: 't1-6',
    type: 'Task 1',
    title: 'Table: Underground Railway Systems',
    prompt: 'The table below gives information about the underground railway systems in six cities. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800&h=400',
    tips: [
      'Do not list all the numbers. Select the highest, lowest, and most interesting data points.',
      'Group the cities based on similarities (e.g., oldest vs. newest, longest vs. shortest).',
      'Ensure you compare the data across the different columns.'
    ],
    samples: [
      {
        band: 8.5,
        text: 'The provided table compares six major cities in terms of the opening date, total route length, and annual passenger numbers of their underground railway systems.\n\nOverall, London boasts the oldest and most extensive underground network, whereas Tokyo serves by far the highest number of passengers annually. In contrast, the systems in Kyoto and Los Angeles are the newest, shortest, and least utilized.\n\nThe London Underground is the oldest system, having opened in 1863. It also has the longest route at 394 kilometers. Paris opened its system later, in 1900, and has a significantly shorter route of 199 kilometers. However, despite its shorter length, the Paris system carries 1191 million passengers per year, which is considerably more than London\'s 775 million. Tokyo\'s system, opened in 1927, is shorter still at 155 kilometers, yet it accommodates a staggering 1927 million passengers annually, making it the most heavily used network by a wide margin.\n\nThe systems in Washington DC, Kyoto, and Los Angeles are relatively modern, opening in 1976, 1981, and 2001 respectively. Washington DC has a moderately long route (126 kilometers) but serves only 144 million passengers. Kyoto and Los Angeles have the smallest networks, at just 11 and 28 kilometers long, and consequently serve the fewest passengers, at 45 million and 50 million per year, respectively.'
      }
    ]
  },

  // ==========================================
  // TASK 2 (15 Topics)
  // ==========================================
  {
    id: 't2-1',
    type: 'Task 2',
    title: 'Technology & Social Interaction',
    prompt: 'Some people believe that technology has made man more social. To what extent do you agree or disagree with this opinion?',
    tips: [
      'Clearly state your position (agree, disagree, or partially agree) in the introduction.',
      'Use specific examples to support your arguments (e.g., social media platforms, video calling apps).',
      'Consider the counter-argument (e.g., technology causes isolation) and refute it to strengthen your essay.'
    ],
    samples: [
      {
        band: 8.0,
        text: 'It is argued by some that technological advancements have enhanced human sociability. I completely agree with this assertion, as technology has removed geographical barriers and created new platforms for community building.\n\nFirstly, the advent of the internet and social media has revolutionized how we connect. In the past, maintaining relationships over long distances was challenging and costly. Today, applications like WhatsApp and Skype allow instant, free communication across the globe. For instance, families separated by continents can interact daily via video calls, maintaining strong bonds that would have been difficult to sustain otherwise. This constant connectivity ensures that physical distance no longer equates to social isolation.\n\nFurthermore, technology has facilitated the creation of online communities based on shared interests rather than geographical proximity. Platforms such as Reddit or specialized forums enable individuals to find like-minded people, fostering social interactions that might not occur in their immediate physical environment. A person living in a remote village with a niche hobby can now connect with thousands of enthusiasts worldwide. This allows for a broader and more diverse social network, enriching an individual\'s social life.\n\nAdmittedly, some argue that excessive screen time leads to a lack of face-to-face interaction. However, online interactions often supplement rather than replace physical ones, and many online friendships eventually lead to real-world meetups.\n\nIn conclusion, technology has undeniably made humans more social by bridging physical distances and providing novel avenues for connection. As technological tools continue to evolve, our capacity for social interaction will likely expand even further.'
      }
    ]
  },
  {
    id: 't2-2',
    type: 'Task 2',
    title: 'Environment: Global Warming',
    prompt: 'Global warming is one of the biggest threats to our environment. What causes global warming? What solutions are there to this problem?',
    tips: [
      'This is a "Causes and Solutions" essay. Do not give your opinion on whether it is a threat; accept the premise.',
      'Dedicate one body paragraph to causes and one to solutions.',
      'Ensure the solutions directly address the causes you mentioned.'
    ],
    samples: [
      {
        band: 8.5,
        text: 'Climate change, driven primarily by global warming, poses an unprecedented threat to the planet\'s ecosystems. This essay will examine the primary causes of this phenomenon, namely the combustion of fossil fuels and widespread deforestation, before proposing viable solutions such as transitioning to renewable energy and implementing stricter environmental regulations.\n\nThe principal catalyst for global warming is the excessive reliance on fossil fuels. Industrial activities, transportation, and energy generation heavily depend on coal, oil, and natural gas. When burned, these fuels release massive quantities of greenhouse gases, particularly carbon dioxide, into the atmosphere, which trap solar heat and elevate global temperatures. Furthermore, deforestation exacerbates this issue. Forests act as vital carbon sinks, absorbing CO2. However, the rampant clearing of land for agriculture and urbanization diminishes the earth\'s capacity to regulate atmospheric carbon, accelerating the warming process.\n\nTo mitigate these critical issues, a multi-faceted approach is required. Firstly, there must be a global shift towards renewable energy sources. Governments should heavily subsidize solar, wind, and hydroelectric power to make them economically viable alternatives to fossil fuels. By transitioning to clean energy, we can drastically reduce greenhouse gas emissions. Secondly, stringent international policies must be enforced to halt deforestation and promote reforestation initiatives. Imposing heavy penalties on illegal logging and providing financial incentives for countries to preserve their forests would significantly restore the planet\'s natural carbon-absorbing capabilities.\n\nIn conclusion, global warming is primarily fueled by greenhouse gas emissions from fossil fuels and the destruction of forests. However, by embracing renewable energy and enforcing strict conservation policies, humanity can effectively combat this environmental crisis and safeguard the planet for future generations.'
      }
    ]
  },
  {
    id: 't2-3',
    type: 'Task 2',
    title: 'Work: Remote Working',
    prompt: 'More and more people are working from home rather than in the workplace. Do the advantages of this trend outweigh the disadvantages?',
    tips: [
      'Clearly state whether the advantages outweigh the disadvantages in the introduction.',
      'Discuss both sides, but focus more on the side you support.',
      'Advantages: no commute, flexible hours. Disadvantages: isolation, lack of teamwork.'
    ],
    samples: [
      {
        band: 7.5,
        text: 'In recent years, there has been a significant shift towards remote working, with an increasing number of employees performing their duties from home. While this trend presents certain drawbacks, such as social isolation, I firmly believe that the benefits, including improved work-life balance and reduced commuting stress, far outweigh the disadvantages.\n\nOn the one hand, working from home can have negative consequences. The most prominent issue is the potential for social isolation and a lack of team cohesion. In a traditional office environment, employees engage in spontaneous conversations and collaborate easily, which fosters a sense of belonging and can spark creativity. Remote workers, however, may feel disconnected from their colleagues, communicating only through formal emails or scheduled video calls. Furthermore, the home environment can be fraught with distractions, such as household chores or family members, which might negatively impact productivity for some individuals.\n\nOn the other hand, the advantages of remote work are substantial. Firstly, it eliminates the need for a daily commute. This not only saves employees a considerable amount of time and money but also reduces traffic congestion and environmental pollution. The time saved can be redirected towards personal pursuits, exercise, or family, significantly enhancing an individual\'s work-life balance and overall well-being. Secondly, remote work offers greater flexibility. Employees can often structure their day to align with their peak productivity hours, rather than adhering to a rigid 9-to-5 schedule. From an employer\'s perspective, allowing remote work can significantly reduce overhead costs associated with maintaining large office spaces.\n\nIn conclusion, although remote working can lead to feelings of isolation and potential distractions, the profound benefits of eliminating commutes, increasing flexibility, and improving work-life balance make it a highly advantageous trend. Therefore, the positive aspects of this development clearly outweigh the negative ones.'
      }
    ]
  },
  {
    id: 't2-4',
    type: 'Task 2',
    title: 'Education: Free University',
    prompt: 'University education should be free for everyone. To what extent do you agree or disagree?',
    tips: [
      'Consider the economic implications of free education (taxes, government spending).',
      'Consider the social implications (equal opportunity, educated workforce).',
      'You can take a balanced approach (e.g., free for low-income, but not everyone).'
    ],
    samples: [
      {
        band: 8.0,
        text: 'The question of whether tertiary education should be provided free of charge to all citizens is a highly debated topic. While I acknowledge that free university education promotes equal opportunity, I disagree that it should be universally free, as this places an unsustainable burden on the economy and may devalue the educational experience.\n\nProponents of free university education argue that it creates a meritocratic society. When financial barriers are removed, students from lower socio-economic backgrounds have the same opportunity to pursue higher education as their wealthier peers. This can lead to a more educated workforce, which ultimately benefits the nation\'s economy through increased innovation and productivity. Furthermore, it prevents young adults from starting their professional lives burdened by crippling student debt, allowing them to contribute to the economy more effectively.\n\nHowever, the economic reality of providing universal free education is highly problematic. Universities require immense funding to maintain facilities, conduct research, and pay highly qualified staff. If tuition fees are abolished, this financial burden falls entirely on the government, which inevitably leads to significantly higher taxes for all citizens, including those who do not attend university. This can strain public resources, potentially diverting funds from other critical sectors such as healthcare or primary education.\n\nMoreover, when education is entirely free, there is a risk that students may not value it as highly. When individuals invest their own money, or take on loans, they are often more motivated to study diligently and complete their degrees. A completely free system might lead to higher dropout rates and a lack of commitment among some students, resulting in a waste of public funds.\n\nIn conclusion, while ensuring access to education for disadvantaged students is crucial, making university universally free is economically unfeasible and potentially detrimental to student motivation. A more balanced approach, such as providing targeted scholarships or income-contingent loans, would be a more effective solution.'
      }
    ]
  },
  {
    id: 't2-5',
    type: 'Task 2',
    title: 'Crime: Prison Sentences',
    prompt: 'Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime. Discuss both views and give your opinion.',
    tips: [
      'Discuss the deterrent effect of long sentences in one paragraph.',
      'Discuss alternatives (rehabilitation, education, community service) in another.',
      'Clearly state your own opinion in the introduction and conclusion.'
    ],
    samples: [
      {
        band: 8.5,
        text: 'The most effective method for deterring criminal activity remains a contentious issue. While some advocate for the imposition of lengthier prison sentences as the primary solution, others argue that alternative approaches, such as rehabilitation and addressing the root causes of crime, are more efficacious. In my opinion, while incarceration is necessary for dangerous offenders, a holistic approach focusing on rehabilitation and social support is a far superior method for reducing crime rates in the long term.\n\nThose who support longer prison sentences argue that they serve as a powerful deterrent. The logic is that if potential criminals know they face severe and prolonged punishment, they will be less likely to commit offenses. Furthermore, keeping criminals incarcerated for extended periods ensures they are physically removed from society, thereby preventing them from re-offending during that time. For violent crimes, this is often seen as the only way to guarantee public safety and provide justice for victims.\n\nConversely, opponents of this view emphasize that prisons often act as "universities of crime," where minor offenders learn more sophisticated criminal techniques from hardened inmates. Therefore, they advocate for alternative methods, primarily rehabilitation. Programs that provide education, vocational training, and psychological counseling within prisons can equip inmates with the skills needed to reintegrate into society successfully. Furthermore, addressing the socioeconomic root causes of crime, such as poverty, unemployment, and lack of education, is a proactive alternative. By investing in community programs and creating job opportunities, governments can prevent individuals from turning to crime out of desperation.\n\nIn my view, relying solely on punitive measures is a short-sighted strategy. While long sentences are justified for heinous crimes, they do not address why crimes occur in the first place. A system that prioritizes rehabilitation and social intervention is more likely to break the cycle of re-offending. When ex-convicts are given the tools to earn a legitimate living, they are far less likely to return to a life of crime.\n\nIn conclusion, although lengthy imprisonment may offer temporary public protection, it is not the optimal solution for crime reduction. Implementing comprehensive rehabilitation programs and tackling societal inequalities represent a much more sustainable and effective approach to creating a safer society.'
      }
    ]
  },
  {
    id: 't2-6',
    type: 'Task 2',
    title: 'Health: Fast Food Tax',
    prompt: 'In some countries, an increasing number of people are suffering from health problems as a result of eating too much fast food. It is therefore necessary for governments to impose a higher tax on this kind of food. To what extent do you agree or disagree?',
    tips: [
      'Consider the effectiveness of taxation in changing consumer behavior.',
      'Think about the ethical implications (is it the government\'s job to control diets?).',
      'Suggest alternative solutions if you disagree (e.g., education, subsidizing healthy food).'
    ],
    samples: [
      {
        band: 7.5,
        text: 'The rising prevalence of diet-related health issues, largely attributed to the overconsumption of fast food, has prompted calls for government intervention. It has been suggested that imposing a higher tax on junk food is a necessary measure to combat this trend. I strongly agree with this proposal, as taxation can act as a powerful deterrent and generate revenue for public health initiatives.\n\nFirstly, increasing the cost of fast food through taxation is a proven method for altering consumer behavior. Economic principles dictate that as the price of a good rises, demand typically falls. Fast food is often chosen because it is cheap and convenient. By making it significantly more expensive, consumers, particularly those on lower incomes who are often disproportionately affected by obesity, will be forced to reconsider their dietary choices. This approach has been successfully implemented with tobacco and alcohol, where heavy taxation has demonstrably reduced consumption rates.\n\nSecondly, the revenue generated from a "fat tax" could be ring-fenced and reinvested into the healthcare system. Treating obesity-related diseases, such as diabetes and heart disease, places an immense financial burden on public health services. The funds raised from taxing unhealthy foods could be used to offset these costs. Furthermore, this money could be utilized to subsidize healthy foods, like fresh fruits and vegetables, making them more accessible and affordable for everyone, or to fund nationwide educational campaigns about nutrition.\n\nCritics of this policy might argue that it infringes upon personal freedom and disproportionately affects the poor. However, the government has a responsibility to protect public health, much like it does by enforcing seatbelt laws. While it may impact lower-income families financially, the long-term health benefits and the reduction in medical costs far outweigh this initial disadvantage.\n\nIn conclusion, levying a higher tax on fast food is a highly effective and necessary strategy. It not only discourages the consumption of unhealthy meals through financial disincentives but also provides crucial funding to support healthcare and promote healthier lifestyle choices across society.'
      }
    ]
  },
  {
    id: 't2-7',
    type: 'Task 2',
    title: 'Society: Aging Population',
    prompt: 'In many countries, the proportion of older people is steadily increasing. Does this trend have more positive or negative effects on society?',
    tips: [
      'Positive effects: wisdom/experience, childcare help, volunteering.',
      'Negative effects: strain on healthcare, pension crisis, shrinking workforce.',
      'Ensure you clearly state which side is stronger.'
    ],
    samples: [
      {
        band: 8.0,
        text: 'Demographic shifts globally are resulting in a rapidly aging population, with the elderly constituting an ever-growing segment of society. While this phenomenon brings certain benefits, such as the retention of societal wisdom, I believe the negative economic and healthcare implications significantly outweigh the positive effects.\n\nOn the positive side, an older demographic can enrich society culturally and socially. Elderly individuals possess a wealth of life experience and historical knowledge that can be passed down to younger generations, fostering a sense of continuity and tradition. Furthermore, many retirees play a crucial role in family structures by providing free childcare for their grandchildren, which allows parents to remain in the workforce. Additionally, older people frequently engage in voluntary work, contributing significantly to community cohesion and local charities.\n\nHowever, the negative consequences of an aging population are profound, primarily concerning the economy and healthcare systems. Economically, a growing proportion of retirees means a shrinking working-age population. This leads to a reduction in tax revenues while simultaneously increasing the government\'s financial burden regarding pension payouts. If the ratio of workers to dependents becomes too skewed, it can lead to economic stagnation and necessitate higher taxes for the younger generation, potentially causing intergenerational resentment.\n\nMoreover, the strain on healthcare services is perhaps the most critical challenge. As people age, they naturally require more medical attention and long-term care for chronic conditions. This surge in demand can overwhelm hospitals and social care systems, leading to longer waiting times and a decline in the quality of care for all citizens. The financial cost of providing specialized geriatric care and funding advanced medical treatments for an aging populace is astronomical and often unsustainable for many governments.\n\nIn conclusion, while the elderly undoubtedly contribute to the social fabric through their experience and familial support, the severe economic pressures and the immense strain placed on healthcare systems present formidable challenges. Therefore, the trend of an aging population has predominantly negative effects on society.'
      }
    ]
  },
  {
    id: 't2-8',
    type: 'Task 2',
    title: 'Media: Focus on Bad News',
    prompt: 'The media usually focuses on bad news, such as crimes and disasters. Some people think this is detrimental to society. Do you agree or disagree?',
    tips: [
      'Agree: causes anxiety, creates a false sense of danger, desensitizes people.',
      'Disagree: keeps people informed, holds authorities accountable, warns of danger.',
      'You can agree but acknowledge the necessity of reporting negative events.'
    ],
    samples: [
      {
        band: 7.5,
        text: 'It is a widely observed phenomenon that mainstream media outlets disproportionately report on negative events, such as violent crimes, natural disasters, and political scandals. While some argue that this is merely a reflection of reality, I strongly agree that this relentless focus on bad news has a detrimental impact on society, primarily by fostering anxiety and distorting public perception.\n\nFirstly, the constant bombardment of negative news significantly impacts the mental well-being of the public. When individuals are continuously exposed to stories of tragedy and danger, it can induce feelings of chronic stress, anxiety, and helplessness. This phenomenon, often referred to as "headline stress disorder," can lead to a pervasive sense of pessimism about the future. For instance, constant reports of violent crime can make people unnecessarily fearful of leaving their homes, even if they live in statistically safe neighborhoods, thereby reducing their quality of life and community engagement.\n\nSecondly, the media\'s fixation on the negative distorts the public\'s understanding of the world. Because bad news is sensationalized to attract viewership and generate advertising revenue, it creates a skewed narrative that the world is inherently dangerous and deteriorating. This ignores the vast amount of positive developments occurring globally, such as advancements in medicine, reductions in extreme poverty, and technological innovations. Consequently, society becomes cynical and distrustful, which can hinder social progress and cooperation.\n\nHowever, it is important to acknowledge that the media has a duty to report on significant events, including negative ones. Informing the public about natural disasters allows for emergency preparedness, and reporting on political corruption is essential for holding authorities accountable. Nevertheless, the issue lies not in reporting bad news, but in its disproportionate dominance over positive or neutral stories.\n\nIn conclusion, while the media must inform the public about critical issues, the overwhelming emphasis on negative news is highly damaging. It cultivates a culture of fear and anxiety while providing a distorted, overly pessimistic view of reality. Therefore, a more balanced approach to journalism, which highlights human achievements alongside challenges, is urgently needed.'
      }
    ]
  },
  {
    id: 't2-9',
    type: 'Task 2',
    title: 'Transport: Free Public Transport',
    prompt: 'Some people think that the government should make public transport free for everyone. To what extent do you agree or disagree?',
    tips: [
      'Agree: reduces traffic, helps the environment, aids low-income families.',
      'Disagree: too expensive for the government, leads to overcrowding, poor maintenance.',
      'Consider a nuanced view (e.g., heavily subsidized but not entirely free).'
    ],
    samples: [
      {
        band: 8.0,
        text: 'The proposition that governments should abolish fares for public transportation is a subject of considerable debate. While making buses and trains free would undoubtedly yield significant environmental and social benefits, I disagree with implementing this policy universally, as the financial burden on the state would likely lead to a deterioration in the quality of the service.\n\nThere are compelling arguments in favor of free public transport. Environmentally, it would serve as a massive incentive for individuals to leave their private vehicles at home. A significant reduction in car usage would drastically decrease traffic congestion in urban centers and lead to a substantial drop in greenhouse gas emissions and air pollution. Socially, free transport would greatly benefit low-income individuals, enhancing their mobility and providing better access to employment and educational opportunities that might otherwise be geographically out of reach.\n\nDespite these advantages, the economic reality of a completely free system is highly problematic. Public transport networks require immense capital for maintenance, paying staff, and upgrading infrastructure. Currently, ticket sales cover a substantial portion of these operational costs. If fares were eliminated, governments would have to bridge this massive financial shortfall entirely through taxation. This could strain public budgets, potentially diverting necessary funds from other vital sectors like healthcare or education.\n\nFurthermore, removing fares could paradoxically ruin the transport system itself. A free service would likely experience a massive surge in ridership, leading to severe overcrowding during peak hours. Without the revenue from tickets, transport authorities would struggle to purchase new vehicles or expand the network to cope with this increased demand. Consequently, the system could become unreliable, unhygienic, and unsafe, ultimately driving people back to using their private cars.\n\nIn conclusion, while the idea of free public transport is appealing for its environmental and social merits, it is economically unsustainable. A more pragmatic approach would be for governments to heavily subsidize fares to make them affordable for all, while retaining a ticketing system to ensure the transport network remains properly funded and efficiently maintained.'
      }
    ]
  },
  {
    id: 't2-10',
    type: 'Task 2',
    title: 'Culture: Globalization',
    prompt: 'Because of the global economy and international trade, many countries are becoming more similar. Is this a positive or negative development?',
    tips: [
      'Positive: better understanding between nations, easier travel/business, shared progress.',
      'Negative: loss of unique cultures/languages, dominance of Western brands.',
      'State clearly if it is mostly positive or mostly negative.'
    ],
    samples: [
      {
        band: 8.5,
        text: 'The acceleration of globalization and international trade has undeniably led to a homogenization of cultures, with nations increasingly resembling one another in terms of consumer habits, architecture, and lifestyle. While this phenomenon facilitates global cooperation, I believe it is predominantly a negative development due to the profound loss of cultural diversity and national identity.\n\nAdmittedly, there are practical advantages to countries becoming more similar. A standardized global culture greatly facilitates international business and travel. When multinational corporations can operate seamlessly across borders using a common language, usually English, and standardized business practices, it boosts global economic efficiency. Furthermore, shared cultural touchstones, such as international films or global brands, can foster a sense of global citizenship and mutual understanding among people from vastly different backgrounds, potentially reducing xenophobia and international conflicts.\n\nHowever, the drawbacks of this cultural convergence are far more significant. The most tragic consequence is the erosion of unique cultural heritages. As global brands like McDonald\'s or Starbucks proliferate, they often outcompete local businesses, leading to the disappearance of traditional culinary practices and local craftsmanship. Consequently, cities around the world are losing their distinct character, transforming into generic urban landscapes filled with the same retail chains and architectural styles.\n\nMoreover, this trend often equates to the dominance of Western, particularly American, culture over others. This cultural imperialism can lead to the marginalization or even extinction of indigenous languages and customs. When younger generations prioritize globalized pop culture over their ancestral traditions, a vital link to their history is severed. A world where every country looks and feels the same is a culturally impoverished one, lacking the richness and variety that makes human civilization so fascinating.\n\nIn conclusion, while the increasing similarity between countries offers certain economic and communicative conveniences, it is fundamentally a negative development. The irreplaceable loss of cultural diversity, traditional languages, and unique national identities is too high a price to pay for global standardization.'
      }
    ]
  },
  {
    id: 't2-11',
    type: 'Task 2',
    title: 'Tourism: Historical Sites',
    prompt: 'International tourism has brought enormous benefit to many places. At the same time, there is concern about its impact on local inhabitants and the environment. Do the disadvantages of international tourism outweigh the advantages?',
    tips: [
      'Advantages: economic growth, job creation, cultural exchange.',
      'Disadvantages: environmental damage, overcrowding, loss of local culture.',
      'Weigh the two sides and provide a clear conclusion.'
    ],
    samples: [
      {
        band: 7.5,
        text: 'The rapid expansion of international tourism has transformed many regions globally, bringing both prosperity and significant challenges. While concerns regarding environmental degradation and disruption to local communities are valid, I believe that the economic and cultural advantages of international tourism still outweigh its disadvantages, provided it is managed sustainably.\n\nThe negative impacts of mass tourism are undeniable. Environmentally, the influx of millions of visitors can put immense strain on local ecosystems. Popular destinations often suffer from increased pollution, littering, and the destruction of natural habitats to make way for hotel complexes. Furthermore, the daily lives of local inhabitants can be severely disrupted. Overcrowding in historical centers makes basic navigation difficult for residents, and the surge in demand for short-term rentals often drives up housing prices, forcing locals out of their own neighborhoods. This phenomenon, known as overtourism, can lead to resentment towards visitors.\n\nHowever, the benefits derived from international tourism are substantial and often vital for the host countries. Economically, tourism is a massive engine for growth. It creates millions of jobs across various sectors, from hospitality and transportation to local retail and tour guiding. For many developing nations, tourist expenditure is the primary source of foreign exchange, funding essential infrastructure projects like roads and hospitals that benefit the entire population. Without this revenue, many regions would face severe economic hardship.\n\nMoreover, tourism fosters cultural exchange and global understanding. When people travel, they are exposed to different ways of life, breaking down prejudices and promoting tolerance. Additionally, the revenue generated from tourism is often the very thing that funds the preservation of historical sites and natural parks. If a country realizes its heritage is a valuable economic asset, it is more likely to invest in protecting it.\n\nIn conclusion, while international tourism can undoubtedly cause environmental damage and social friction, its role in driving economic development and facilitating cultural exchange is paramount. Therefore, the advantages outweigh the disadvantages, but it is imperative that governments implement strict regulations to ensure tourism develops in a sustainable and respectful manner.'
      }
    ]
  },
  {
    id: 't2-12',
    type: 'Task 2',
    title: 'Space: Exploration Funding',
    prompt: 'Governments are spending a large amount of money on space exploration. Some people think this money should be used to solve problems on Earth. Discuss both views and give your opinion.',
    tips: [
      'View 1: Earth\'s problems (poverty, disease, climate change) are urgent and need funding.',
      'View 2: Space exploration brings technological advancements, resources, and inspires humanity.',
      'Give your opinion clearly.'
    ],
    samples: [
      {
        band: 8.0,
        text: 'The allocation of national budgets to space exploration programs is a highly controversial issue. While many argue that these astronomical funds would be better spent addressing urgent terrestrial crises, others maintain that investing in space yields invaluable scientific and technological benefits. In my opinion, although Earth\'s problems require immediate attention, a portion of government funding must remain dedicated to space exploration due to its long-term benefits for humanity.\n\nThose who oppose space funding argue that it is morally unjustifiable to spend billions on exploring the cosmos while millions suffer on Earth. Our planet is currently facing existential threats such as extreme poverty, widespread famine, and the devastating impacts of climate change. Critics argue that the exorbitant budgets allocated to agencies like NASA could be redirected to eradicate diseases, build infrastructure in developing nations, or transition the global economy to renewable energy. From this perspective, focusing on Mars or the Moon is a luxury humanity cannot afford until basic human needs are met globally.\n\nConversely, proponents of space exploration emphasize the immense, often unforeseen, benefits it brings to society. The technological innovations developed for space missions frequently find applications in everyday life. For instance, satellite technology, which is crucial for modern communication, weather forecasting, and GPS navigation, is a direct result of space programs. Furthermore, space exploration pushes the boundaries of human knowledge and inspires future generations of scientists and engineers. Looking further ahead, exploring other planets may ultimately be necessary for the survival of the human race, either by discovering new resources or providing alternative habitats if Earth becomes uninhabitable.\n\nIn my view, it is a false dichotomy to suggest we must choose entirely between Earth and space. While the lion\'s share of public funds must undoubtedly be prioritized for solving immediate humanitarian and environmental crises, completely defunding space exploration would be short-sighted. The technological spin-offs and the fundamental human drive to explore are too valuable to abandon.\n\nIn conclusion, while the pressing issues on Earth demand the majority of our resources and attention, maintaining a reasonable level of investment in space exploration is essential for continued technological advancement and the long-term future of humanity.'
      }
    ]
  },
  {
    id: 't2-13',
    type: 'Task 2',
    title: 'Animals: Zoos',
    prompt: 'Some people think that zoos are cruel and all the zoos should be closed. However, some people think zoos are useful to protect the rare animals. Discuss both these views and give your opinion.',
    tips: [
      'Discuss the cruelty aspect (confinement, unnatural habitats, stress).',
      'Discuss the conservation aspect (breeding programs, education, protection from poachers).',
      'Provide your opinion (e.g., close bad zoos, keep conservation-focused ones).'
    ],
    samples: [
      {
        band: 7.5,
        text: 'The existence of zoos has long been a subject of ethical debate. While some animal rights advocates argue that keeping animals in captivity is inherently cruel and demand their closure, others defend zoos as vital institutions for the conservation of endangered species. In my opinion, while traditional entertainment-focused zoos should be phased out, modern, conservation-oriented zoological parks play an indispensable role in protecting global biodiversity.\n\nThose who campaign for the closure of zoos primarily focus on the ethical implications of captivity. They argue that confining wild animals to small enclosures deprives them of their natural behaviors, such as hunting, roaming vast territories, and forming complex social hierarchies. This unnatural environment often leads to severe physical and psychological distress, evidenced by repetitive behaviors like pacing or self-mutilation. Furthermore, critics argue that keeping animals captive solely for human amusement is morally unjustifiable, reducing sentient beings to mere exhibits.\n\nOn the other hand, supporters highlight the critical conservation work undertaken by modern zoos. With natural habitats being destroyed at an alarming rate due to deforestation and climate change, zoos often serve as the last refuge for many critically endangered species. Through carefully managed captive breeding programs, zoos have successfully saved several species from the brink of extinction, such as the Arabian Oryx and the California Condor, with the ultimate goal of reintroducing them into the wild. Additionally, zoos serve an important educational function, allowing the public to connect with wildlife and raising awareness and funds for global conservation efforts.\n\nIn my view, the debate hinges on the purpose and quality of the institution. Zoos that prioritize profit and exhibit animals in cramped, inadequate conditions are indeed cruel and should be shut down. However, institutions that prioritize animal welfare, invest heavily in veterinary care, and actively participate in global breeding and conservation programs are essential. Without them, many species would simply cease to exist.\n\nIn conclusion, while the confinement of animals raises valid ethical concerns, the role of high-quality zoos in preventing extinction and educating the public is too important to dismiss. Therefore, rather than closing all zoos, we should enforce stricter regulations to ensure they function primarily as centers for conservation and animal welfare.'
      }
    ]
  },
  {
    id: 't2-14',
    type: 'Task 2',
    title: 'Children: Competitive Sports',
    prompt: 'Some people think that competitive sports have a positive effect on the child\'s education, while others argue it is not so. Discuss both views and give your opinion.',
    tips: [
      'Positive: teaches teamwork, discipline, dealing with failure, physical health.',
      'Negative: causes stress, detracts from academic studies, fosters aggression.',
      'Give a clear opinion.'
    ],
    samples: [
      {
        band: 8.0,
        text: 'The role of competitive sports in a child\'s educational journey is a topic of ongoing discussion. While some argue that engaging in competition fosters negative traits and stress, I firmly believe that when managed correctly, competitive sports provide invaluable life lessons that significantly enhance a child\'s overall development.\n\nThose who are skeptical of competitive sports in schools often point to the psychological pressure it places on young minds. The intense desire to win, often exacerbated by overzealous coaches or parents, can lead to severe anxiety and a fear of failure. If a child consistently loses or is not selected for a team, it can severely damage their self-esteem. Furthermore, critics argue that an overemphasis on sports can distract students from their primary academic responsibilities, leading to a decline in their scholastic performance. There is also the concern that highly competitive environments can foster aggression and a "win at all costs" mentality, rather than good sportsmanship.\n\nConversely, the proponents of competitive sports highlight the profound positive impacts on character building. Firstly, participating in team sports teaches children the vital importance of collaboration and communication. They learn to work towards a common goal, respect their peers, and understand that success often relies on collective effort rather than individual brilliance. Secondly, competition provides a safe environment for children to learn how to cope with both victory and defeat. Learning to lose gracefully and to persevere in the face of setbacks builds resilience, a crucial trait for navigating challenges in adult life. Finally, the discipline required to train regularly translates well into academic life, teaching children time management and dedication.\n\nIn my opinion, the benefits of competitive sports far outweigh the potential drawbacks. The key lies in the approach of the educators and parents. If the focus remains on effort, teamwork, and personal improvement rather than solely on winning, sports become a powerful educational tool. The resilience and social skills learned on the field are just as important as the academic knowledge gained in the classroom.\n\nIn conclusion, while excessive pressure in sports can be detrimental, a healthy competitive environment is highly beneficial. It equips children with essential physical, social, and psychological skills that are fundamental to a well-rounded education.'
      }
    ]
  },
  {
    id: 't2-15',
    type: 'Task 2',
    title: 'Housing: Building in Countryside',
    prompt: 'With the increasing demand for housing, some people believe that towns and cities should be built on rural land. Do you agree or disagree?',
    tips: [
      'Agree: solves housing crisis, lowers property prices, improves living standards.',
      'Disagree: destroys natural habitats, reduces agricultural land, causes urban sprawl.',
      'Consider alternatives like building high-rises or redeveloping brownfield sites.'
    ],
    samples: [
      {
        band: 8.5,
        text: 'The escalating global population and rapid urbanization have led to a severe housing shortage in many nations. Consequently, some advocate for the expansion of towns and cities into undeveloped rural areas to meet this demand. I strongly disagree with this approach, as the destruction of the countryside poses severe environmental and agricultural threats; instead, we should focus on urban regeneration and higher-density living.\n\nThe primary reason to oppose building on rural land is the devastating environmental impact. The countryside is not merely empty space; it comprises vital ecosystems, forests, and wetlands that support diverse wildlife. Expanding urban sprawl into these areas leads to irreversible habitat destruction, pushing many species toward extinction. Furthermore, rural areas act as essential "green lungs," absorbing carbon dioxide and mitigating the effects of climate change. Paving over these lands with concrete and asphalt significantly exacerbates global warming and increases the risk of flooding, as natural drainage systems are destroyed.\n\nAnother critical concern is the loss of agricultural land. As the global population grows, the demand for food increases simultaneously with the demand for housing. If we continuously sacrifice fertile farmland to build residential estates, we threaten our food security. Relying increasingly on imported food is not only economically unstable but also environmentally damaging due to the carbon footprint of transportation. Preserving rural land is therefore essential for sustaining local agriculture and ensuring a stable food supply.\n\nRather than encroaching on the countryside, governments should prioritize the redevelopment of existing urban spaces. Many cities possess "brownfield sites"—abandoned industrial or commercial areas—that can be cleaned up and repurposed for residential use. Additionally, adopting higher-density housing models, such as well-designed high-rise apartments, allows cities to accommodate more people within their current footprints. Improving public transportation also enables people to live in existing suburban areas without relying on cars, reducing the need for new, sprawling developments.\n\nIn conclusion, while the need for new housing is undeniable, sacrificing rural land is a short-sighted and destructive solution. By focusing on urban regeneration, utilizing brownfield sites, and building upwards rather than outwards, we can solve the housing crisis without destroying the natural environment and our agricultural foundation.'
      }
    ]
  }
];
