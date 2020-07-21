<!-- Title -->
Comic Collector

<!-- Link to live app -->
[Live link](https://comic-collector.vercel.app/)

<!-- Api Documentation -->
Base url- https://peaceful-lowlands-92283.herokuapp.com/api/
Endpoints
    path('/collection')
        requires headers: { 
            "Authorization": "bearer (user auth token)" 
            }
        
        GET return all comics in specified users collection(user dtermined by authtoken)
        
        POST request body: { 
            "comic_title": (text), 
            "comic_author": (text), 
            "is_read": (boolean), 
            "description": (text), 
            "user_id": (integer associated with user), 
            "issue": (integer)
            }

    path('/collection/:id')
        requires headers: { 
            "Authorization": "bearer (user auth token)" 
            }

        DELETE :id should be the id of the comic you wish to delete

        PATCH :id should be the id of the comic you wish to update. only is_read can be updated at this time
            request body: {
                "is_read": (boolean)
            }

    path('/wishlist')
        requires headers: { 
            "Authorization": "bearer (user auth token)" 
            }
        
        GET return all comics in specified users wishlist(user dtermined by authtoken)
        
        POST request body: { 
            "comic_title": (text), 
            "comic_author": (text), 
            "is_read": (boolean), 
            "description": (text), 
            "user_id": (integer associated with user), 
            "issue": (integer)
            }

    path('/wishlist/:id')
        requires headers: { 
            "Authorization": "bearer (user auth token)" 
            }

        DELETE :id should be the id of the comic you wish to delete

        PATCH :id should be the id of the comic you wish to update. only is_read can be updated at this time
            request body: {
                "is_read": (boolean)
            }

    path('/auth/login')
        POST compare login credentials to user database to verify login info requires headers: {
                "content-type": "application/json",
            },
            body{
                "user_name": (username),
                "password": (password)
            }

    path('/users')
        POST register a username and password for a new user. password must be longer than 8 characters. password must be less than 72 characters. Password must not start with or end with empty spaces. Password must contain 1 upper case, one lower case, one number, and one special character. Username must be unique.
        requires headers: {
                "content-type": "application/json",
            },
            body{
                "user_name": (unique username),
                "password": (valid password)
            }
<!-- Screenshots -->
![Alt text](https://github.com/jdoliverr/comic-collector/blob/master/public/images/ex-comic-collection.jpg?raw=true)

<!-- Summary -->
Comic collector is designed as a way to digitally keep track of comic book collections. After creating an account and signing in users can add comic books they own to their collection list. Additionally users can add comic book to their wishlist if they don't own them so they know what titles they want to purchase. When adding a comic to either list the user will supply a title, author, issue number, and description as well as indidcate if they have read that comic. All this information is then displayed back to the user. Both lists have search and sort functionality. The sort functionality sorts the list of comics alphabetically by either title or author. The search field takes user input and searches for comics whose titles matches the given input. All comics have two buttons, one to delete the comic and one to toggle whether the user has read it.  