# bytecity-nft-view
bytecity nftView website

# Start the app:
```
npm i
npm run start
```

That comand will build and serve the app on port 3004

# Web server

URL `http://localhost:3004/#/brucelee/solana/5` 
# Test API server

```
➜  syn-staking git:(main) ✗ curl  http://localhost:3004/brucelee/solana/5 -H "Accept: application/json" | json_pp
{
   "code" : 0,
   "data" : {
      "Arm Tattoo" : "soil",
      "Arms" : "Purple Combat Hand armor",
      "Back Tattoo" : "Dragon Symbol",
      "Body" : "Purple Open-front shirt",
      "Brand" : "solana",
      "Description" : "The Cyber Collection marks Bruce Leeâs first-ever Metaverse appearance while offering his fans an immersive digital experience to engage with the legend.\nIt is created to pay homage to and activate the official Bruce Lee 50th Tribute event in Byte City.\nEach playable avatar serves as a digital relic, immortalizing the essence of Bruce Leeâs legacy whose impact on the world continues to resonate, transcending time and technology.",
      "Head" : "Solana",
      "Image" : "https://brucelee-asset-exchange.s3.us-west-1.amazonaws.com/cyber-robot-2/Solana/Image/BruceLeeRobSolana_5.png",
      "Legs" : "Purple Traditional Pants",
      "Name" : "BruceLeeCyber #5",
      "Quality" : "Common",
      "Skin" : {
         "attrs" : [
            {
               "name" : "Mobility",
               "type" : 0,
               "value" : 18,
               "valueStr" : ""
            },
            {
               "name" : "Attack",
               "type" : 0,
               "value" : 1823,
               "valueStr" : ""
            },
            {
               "name" : "Sensory",
               "type" : 0,
               "value" : 19,
               "valueStr" : ""
            },
            {
               "name" : "Dodge",
               "type" : 0,
               "value" : 17,
               "valueStr" : ""
            },
            {
               "name" : "Charisma",
               "type" : 0,
               "value" : 182,
               "valueStr" : ""
            },
            {
               "name" : "Electronic Gene",
               "type" : 1,
               "value" : 0,
               "valueStr" : "This machine's programming is as unpredictable as a glitch in the system."
            },
            {
               "name" : "Electronic Gene",
               "type" : 1,
               "value" : 0,
               "valueStr" : "Unpredictability is this robot's middle name, making it a force to be reckoned with."
            },
            {
               "name" : "Electronic Gene",
               "type" : 1,
               "value" : 0,
               "valueStr" : "Beware of this robot's devious nature, as its unpredictable actions can catch you off guard."
            },
            {
               "name" : "Electronic Gene",
               "type" : 1,
               "value" : 0,
               "valueStr" : "Don't let its sleek design fool you, this robot is as unpredictable as a thunderstorm."
            }
         ],
         "level" : 1,
         "power" : 3175
      },
      "market" : "solana",
      "series" : "brucelee",
      "tokenid" : 5
   }
}
```