const https = require('https');



// I haven't been able to get professional and technical degrees to work.  It works in my code in java code though.  I've included my
// java code, commented out, for anyone to see if they can fix the javascript code:

// website = "https://www.bellevuecollege.edu/programs/degrees/proftech/";
// 		url = new URL(website);
// 		in = new BufferedReader(new InputStreamReader(url.openStream()));
		
// 		input = "";
// 		text = "";
// 		while((input = in.readLine())!=null) {
// 			text = text + input + "\n";
// 		}
		
// //		System.out.println(text);
		
		
// 		pattern = Pattern.compile("<td>(.*)</td>");
// 		matcher = pattern.matcher(text);
// 		ArrayList<String> stringArray = new ArrayList<String>();
// 		while (matcher.find()) {
// 			stringArray.add(matcher.group(1));
// 		}
		
// 		for (String s : stringArray)
// 		{
// 			System.out.println(s);
// 		}
	
// 		pattern = Pattern.compile(".*>(.*)</a>");
// 		int counter = 0;
// 		for (String s : stringArray)
// 		{
// 			if (counter % 4 == 0)
// 			{
// 				matcher = pattern.matcher(s);
// 				if (matcher.find()) {
// 					System.out.print(matcher.group(1) + ", ");
// 				} 
// 				else {
// 					s = s.replace("&#8211;", "&");
// 					System.out.println(s + ", ");
// 				}
// 			}
// 			counter++;
// 		}

exports.getDegrees = (cb) => {

    const regex = /<td>(.*)<\/td>\(/g;
    const regex2 = /.*>(.*)<\/a>/g;

    https.get('https://www.bellevuecollege.edu/programs/degrees/proftech/', (res) => {
        let data = '';

        res.on('data', (d) => {
            // process.stdout.write(d);
            data += d.toString();
        }).on('end', (e) => {
            let array = [];
            while ((match = regex.exec(data))) {
                match.shift();
                match.forEach((s) => {
                    array.push(s);
                      console.log(s);
                })
            }

            let array2 = [];
            for (let number = 0; number < array.length; number = number + 4)
            {
                if (match.regex2.exec(array[number]))
                    {
                        match.shift();
                        match.forEach((u) => {
                            array2.push(u);
                            console.log(u);
                        })
                    }
            }
            cb(array2);
        })

    }).on('error', (e) => {
        console.error(e);
    });
} 