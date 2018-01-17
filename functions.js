ASCIICHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';

function AsciiParser(string)
	{
		for(var c = 0; c < string.length; c++)
			{
				if(ASCIICHARS.indexOf(string[c]) == -1)
					{
						return false;
					}
			}
		return true;
	}
function AsciiList(string)
	{
		s = string.replace(/\s/g, "");
		l = Array.from(new Set(s));
		l.sort();
		return l;
	}
function MakeHexDic(l)
	{
		d = {};
		for(let i = 0; i < l.length; i++)
			{
				//d[l[i]] = i[2].charCodeAt(i).toString(16).toUpperCase();
				d[l[i]] = (i%16).toString(16).toUpperCase();
			}
		return d;
	}
//Pronto
function MakeSeed(s, d)
	{
		s = s.replace(/\s/g, "");
		l = Array.from(s);
		seed = [];
		for(var c = 0; c < l.length; c++)
			{
				//seed.push(Object.keys(d)[c]);
				seed.push(d[l[c]]);
			}

		//Object.entries(obj).reduce((p,n) => p.concat(n), []);
		//seed = Object.values(d);

		seed = seed.join("");
		while(seed.length < 64)
			{
				seed += seed;
			}
		return seed.slice(0,64);
	}//Pronto

function MainFlow(s)
	{
		if (!AsciiParser(s))
			{
				return false;
			}
		l = AsciiList(s);
		d = MakeHexDic(l);
		seed = MakeSeed(s, d);
		return seed;
	}

//-------------------------------------------------------------------
document.querySelector(".btn").onclick = () =>
    {
        phrase = document.querySelector(".phrase");
        warning = document.querySelector(".warning");
        seedField = document.querySelector(".seed");

        if(phrase.value == 0)
            {
				warning.classList.remove("alert-success");
				warning.classList.add("alert-danger");
				warning.textContent = "Insert a phrase first";
                seedField.textContent = "";
            }

        else if(MainFlow(phrase.value) !== false)
            {
				warning.classList.remove("alert-success");
				warning.classList.remove("alert-danger");
				warning.classList.add("alert-success");
				warning.textContent = "Your seed";
				seedField.style.color = "#3c763d";
                seedField.textContent = MainFlow(phrase.value);
            }
        else
            {
				warning.classList.add("alert-danger");
				warning.textContent = "Your phrase has an invalid character";
                seedField.textContent = "";
            }
    }
