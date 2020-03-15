This repository is for **LostNFound**, a service which allows college students to post items that they have lost and ask others to find it for them.

<h2>Getting Started</h2>

Repository: https://github.com/eecs-330-Lost-and-Found/Prototype<br>
Deployment Link: https://hcilogin.firebaseapp.com/<br>
Running on local server: Clone the repository, then run `npm install` and `npm start` from the root directory. Navigate to http://localhost:3000 to view the running app. Prototype is best viewed on Google Chrome on a Mac OS.

In order to explore the full functionalities of the app right off the bat, log in as either of the following two users:

User 1 (John Doe):<br>
Email: johndoe@gmail.com<br>
Password: lostnfound

User 2 (Jane Doe):<br>
Email: janedoe@gmail.com<br>
Password: lostnfound

<h2>Problem and Related Work</h2>

This project tackles a universal problem: humans are prone to error, and leave their belongings in the wrong places. A survey by Bluetooth tracking company Pebblebee revealed that the average American loses around \$5,591 in their lifetime due to lost items.

Currently, the most popular options to find lost items involve attachable Bluetooth trackers. Apps like Chipolo and TrackR make use of this solution. However, users are still likely to lose items that he or she has not attached a tracker to, in which case such apps would not help. This solution also requires users to purchase hardware and charge or replace the batteries, thus lowering accessibility. Finally, when these items escape Bluetooth range (around 200ft), they cannot be tracked. Thus, while these apps are helpful in finding misplaced items in the house, they do not help users find items that are far away.

Instead, LostNFound aims to connect those who have lost items with other “finders” so that they can easily regain possession of such items. When someone posts a lost item, he or she can include a bounty for finding that item, so that other users will be motivated to find the lost item. Unlike previous solutions, the app works for any lost item as it does not depend on external hardware such as Bluetooth trackers.

<h2>User Research</h2>

One the things we hoped to learn from our research is the level of trust that people have for other members of the Northwestern community. Through this, we would be able to gauge whether people would actually post lost items or not use our service at all because of the fear that their items would be stolen. We also hoped to learn what kind of reward would motivate them to return others’ lost items. Finally, we wanted to know whether a centralized lost and found (i.e., finders return lost items to a lost and found station) or a peer-to-peer lost and found (i.e., requester and finder meets up) would be more convenient. To learn about our target users’ preferences, we asked questions like:

- If you posted a lost item and another Northwestern student or faculty member found it, would you trust them to return the item to you?
- Would a peer-to-peer lost and found system or a centralized lost and found (with stations) be more comfortable for you?

Through our interview process, we identified the following user needs:

- The ability to find lost items in an easier fashion
- A way to contact the people who might have found their lost items
- Motivation to return other people’s lost items

Drawing from these user needs, the tasks that needed to be supported by our app are:

- A general system of filing lost items, as well as a way to confirm one’s finding of a lost item on the app
- Having a rewarding mechanism (cash reward) that will motivate other people to help others finding lost items.
- Chatting with other people on the app would make communication easier and help increase finders’ credibility

Some personas we envision using our app are:

- Grace, a second-year undergraduate at Northwestern: Grace keeps a lot of belongings, such as her ID card and earbuds, in her pockets. However, they fall out from time to time when she skateboards on campus. Usually she picks them up, but sometimes she misses one or two extra things that fell out. She feels afraid to directly ask people if they have seen her lost item.
- John, a graduate student at Kellogg: John is somewhat careless and often forgets his belongings. For example, last week he left his water bottle at Blomquist after playing basketball. Another time, he left his wallet on the counter at a nearby bar. If his friends are available, he can ask them to find his lost items, but other times he must go back to the location himself. By the time he arrives there, however, the item is usually gone.

<h2>Paper Prototyping</h2>

[Click here](https://drive.google.com/file/d/1NhJuVDhSRbpOmkBfSZNJ4Fash3h9DsdO/view?usp=sharing) to view our paper prototyping video.

Some observations and usability problems from the paper prototype:

- Filing lost items and reporting found items was not very hard
- All our three users did not have much trouble navigating through different pages
- Various problems when confirming a lost item or claiming a found item:
  - It was unclear what to put in the description for the found item
  - The purpose of the “send email” button, which is to contact the original owner, was not clear to the users
  - People would look for a “submit” button, which we did not include in the prototype

Directions to pursue based on observations from paper prototype:

- Change “send email” to something more intuitive like “Submit”. Once that button is clicked, we can have a message with the user’s responses be automatically sent to the person who posted the listing (via email or direct message in the app)
- For the description in the “found a lost item page”, we want to give users specific questions about what they found, so they know how much info to provide. These could be something like “what color is the item you found?” or “where did you find it?”
- For the security questions on the “claim a found item” page, we need to add a short description above the questions that says they will be used to confirm whether the user truly owns this item — this will help clear up the purpose of the questions

<h2>High-Fidelity Prototyping</h2>

**Supported Task 1:** User posts a request for others to find their lost item, giving a monetary reward to anyone who is able to find it.

<img src=https://raw.githubusercontent.com/eecs-330-Lost-and-Found/Prototype/project_8/assets/file-lost-item.png width=800 />

Component 1: Data Collection Form

- The data collection form is meant to gather information about an item that a user may have lost. Once the user inputs necessary data into the form, the data is sent to a back-end Firebase database and is later displayed on the homepage as a “Lost Item Listing” which finders can respond to.
- Design Criteria
  - Contains 5+ fields (name, category, location, date lost, reward, image)
  - Contains at least two different types of fields (text, image upload, select)
  - Supports data validation for currency when inputting reward and date

Component 2: Interactive Data Selection

- The interactive data selection component is a Google Map that allows users to move a “location picker” and choose the location where they last saw their lost item. This location data is posted along with the item data, so that finders can know where to look for a lost item.
- Design Criteria
  - Represents location data that is easier to understand with visualization.
  - Includes interaction in the form of dragging a “location picker” to the desired location on the map.
  - New data in the form of an address is shown when the picker is moved to a different spot on the map.

**Supported Task 2:** User logs in with an account that they have created and views the descriptions that finders have sent for their lost items. User emails one of the finders so that they can meet the finder and retrieve their lost item.

<img src=https://raw.githubusercontent.com/eecs-330-Lost-and-Found/Prototype/project_8/assets/login-one.png width=400 />
<img src=https://raw.githubusercontent.com/eecs-330-Lost-and-Found/Prototype/project_8/assets/login-two.png width=400 />
<img src=https://raw.githubusercontent.com/eecs-330-Lost-and-Found/Prototype/project_8/assets/inbox.png width=800 />

Component: User Profiles

- The login functionality on our app allows for the creation of user profiles, which can be used to view a personalized message inbox. The inbox includes messages from finders who claim to have found a lost item that you posted on the LostNFound Platform.
- Design Criteria
  - Provide a login feature that allows a user to enter their credentials
  - Support for at least two users has been enabled. In order to see an inbox that is already filled in, log in as either of the following two users:
    - User 1 (John Doe):<br>
      Email: johndoe@gmail.com<br>
      Password: lostnfound
    - User 2 (Jane Doe):<br>
      Email: janedoe@gmail.com<br>
      Password: lostnfound
  - Our website shows a personalized message inbox for each user, as well as the user’s display name on the upper left hand corner.

**Supported Task 3:** User finds a lost item that has been posted on the website, and contacts the owner with the details of what he/she has found.

<img src=https://raw.githubusercontent.com/eecs-330-Lost-and-Found/Prototype/project_8/assets/lost-items.png width=800 />
<img src=https://raw.githubusercontent.com/eecs-330-Lost-and-Found/Prototype/project_8/assets/confirm-item.png width=800 />

Component: Social Interaction

- Users who have found a lost item on the website can click on the listing of the item on the home page (can optionally use filters to narrow down results). The social interaction component comes into play when the finder enters a description of the item they found, uploads an image, and sends a message. The message is then shown on the owner’s inbox page.
- Design Criteria:
  - At least one type of social interaction (between finders and owners) is supported.
  - Only users who are logged in are able to notify others of whether or not they have found a lost item listing. Anonymity is not allowed.
  - Sent messages are displayed in chronological order on the owner’s inbox page.

<h2>Reflection</h2>

What we managed to accomplish:

- A majority of our main tasks: this includes filing a lost item, creating an account and logging in, viewing messages that you have received from other users, and confirming one’s finding of a lost item.
- Refactoring vanilla Javascript code to React for smoother transitions between pages, as well as cleaner code and state management
- Integration of external APIs, including Firebase authentication and Google Maps
- Linkage to persistent backend in Firebase Realtime Database

Next steps:

- Our original plan was to also create another functionality where users would be able to upload their findings (before someone posted a lost item) and other users would be able to claim the items that had been found. We did not have enough time to implement this idea, and it would be great to be able to do it.
- While the interactive Google Map is shown on the “File a Lost Item” page, it is not shown on the page where the user confirms their finding of a lost item. Showing a map on the “confirm finding” page as well would help the finder know the general vicinity in which they should be looking for a lost item.
- We would like to limit authentication to only users at Northwestern or other school communities, as that would increase credibility amongst users. Right now, anyone can sign up with any email.
