module.exports = {
    'facebookAuth': {
        'clientID': '1283413772084898', // your App ID
        'clientSecret': 'f5ab1301c721204faeace97a615a4ea8', // your App Secret
        'profileFields': ['id', 'displayName', 'picture.type(large)', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link'],
        'callbackURL': 'http://localhost:5000/auth/facebook/callback'
    },
    'googleAuth': {
        'clientID': '219019579081-eblmtohct7svdo3idoaqbattfn5eq6t4.apps.googleusercontent.com', // your App ID
        'clientSecret': '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', // your App Secret

        'callbackURL': 'http://localhost:5000/auth/google/callback'
    },
    
}


